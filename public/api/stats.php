<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$config = regresja_config();
$secret = (string) ($config['stats_secret'] ?? '');
$provided = $_SERVER['HTTP_X_REGRESJA_STATS_KEY'] ?? ($_GET['key'] ?? '');
if ($secret === '' || !hash_equals($secret, (string) $provided)) {
    regresja_json_response(['ok' => false, 'error' => 'unauthorized'], 401);
}

function regresja_read_jsonl(string $name, array $config): array
{
    $file = regresja_storage_file($name, $config);
    if (!is_file($file)) {
        return [];
    }
    $rows = [];
    $handle = fopen($file, 'rb');
    if (!$handle) {
        return [];
    }
    while (($line = fgets($handle)) !== false) {
      $row = json_decode(trim($line), true);
      if (is_array($row)) {
          $rows[] = $row;
      }
    }
    fclose($handle);
    return $rows;
}

function regresja_since(string $range): DateTimeImmutable
{
    $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
    return match ($range) {
        'today' => $now->setTime(0, 0),
        '24h' => $now->modify('-24 hours'),
        '7d' => $now->modify('-7 days'),
        '31d' => $now->modify('-31 days'),
        '1y' => $now->modify('-1 year'),
        default => $now->modify('-7 days'),
    };
}

function regresja_filter_range(array $rows, DateTimeImmutable $since): array
{
    return array_values(array_filter($rows, function (array $row) use ($since): bool {
        $ts = $row['ts'] ?? '';
        if ($ts === '') return false;
        try {
            return new DateTimeImmutable($ts) >= $since;
        } catch (Throwable) {
            return false;
        }
    }));
}

function regresja_top(array $rows, string $field, int $limit = 12): array
{
    $counts = [];
    foreach ($rows as $row) {
        $value = trim((string) ($row[$field] ?? ''));
        if ($value === '') $value = '(brak)';
        $counts[$value] = ($counts[$value] ?? 0) + 1;
    }
    arsort($counts);
    return array_slice($counts, 0, $limit, true);
}

$range = regresja_sanitize_scalar($_GET['range'] ?? '7d', 20);
$since = regresja_since($range);
$events = regresja_filter_range(regresja_read_jsonl('events.jsonl', $config), $since);
$leads = regresja_filter_range(regresja_read_jsonl('leads.jsonl', $config), $since);
$sessions = [];
$duration = 0;
foreach ($events as $event) {
    if (($event['sessionId'] ?? '') !== '') {
        $sessions[$event['sessionId']] = true;
    }
    $duration += (int) ($event['durationSeconds'] ?? 0);
}

regresja_json_response([
    'ok' => true,
    'range' => $range,
    'since' => $since->format(DateTimeInterface::ATOM),
    'summary' => [
        'events' => count($events),
        'pageViews' => count(array_filter($events, fn($e) => ($e['event'] ?? '') === 'page_view')),
        'ctaClicks' => count(array_filter($events, fn($e) => ($e['event'] ?? '') === 'cta_click')),
        'leads' => count($leads),
        'sessions' => count($sessions),
        'totalDurationSeconds' => $duration,
    ],
    'topPages' => regresja_top(array_filter($events, fn($e) => ($e['event'] ?? '') === 'page_view'), 'page'),
    'topReferrers' => regresja_top($events, 'referrer'),
    'countries' => regresja_top(array_merge($events, $leads), 'country'),
    'recentLeads' => array_slice(array_reverse($leads), 0, 20),
]);
