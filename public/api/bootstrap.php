<?php
declare(strict_types=1);

function regresja_config(): array
{
    $default = [
        'admin_password_hash' => '',
        'stats_secret' => '',
        'export_secret' => '',
        'export_encryption_key' => '',
        'allow_plain_export' => false,
        'storage_dir' => __DIR__ . '/../storage',
        'notification_email' => 'info@instytutregresji.pl',
        'ignored_ips' => [],
        'ignored_ip_hashes' => [],
        'ignore_owner_leads' => true,
        'allowed_hosts' => ['regresjalbl.pl', 'www.regresjalbl.pl', '127.0.0.1', 'localhost'],
        'geo_headers' => [
            'country' => ['HTTP_CF_IPCOUNTRY', 'GEOIP_COUNTRY_CODE', 'HTTP_X_COUNTRY_CODE', 'HTTP_X_GEO_COUNTRY'],
            'city' => ['HTTP_CF_IPCITY', 'GEOIP_CITY', 'HTTP_X_CITY', 'HTTP_X_GEO_CITY'],
            'region' => ['HTTP_CF_REGION', 'GEOIP_REGION', 'HTTP_X_REGION', 'HTTP_X_GEO_REGION'],
        ],
    ];
    $config = $default;
    $customPaths = [
        __DIR__ . '/config.php',
        dirname(__DIR__, 2) . '/.regresjalbl-analytics/config.php',
    ];
    foreach ($customPaths as $customPath) {
        if (!is_file($customPath)) {
            continue;
        }
        $custom = require $customPath;
        if (is_array($custom)) {
            $config = array_replace($config, $custom);
        }
    }
    return $config;
}

function regresja_json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function regresja_request_json(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        regresja_json_response(['ok' => false, 'error' => 'invalid_json'], 400);
    }
    return $data;
}

function regresja_client_ip(): string
{
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        $value = $_SERVER[$key] ?? '';
        if ($value !== '') {
            $first = trim(explode(',', $value)[0]);
            if (filter_var($first, FILTER_VALIDATE_IP)) {
                return $first;
            }
        }
    }
    return '';
}

function regresja_is_ignored_ip(array $config): bool
{
    $ip = regresja_client_ip();
    if ($ip !== '' && in_array($ip, $config['ignored_ips'] ?? [], true)) {
        return true;
    }
    $hashes = $config['ignored_ip_hashes'] ?? [];
    $ipHash = regresja_ip_hash($config);
    return $ipHash !== '' && is_array($hashes) && in_array($ipHash, $hashes, true);
}

function regresja_storage_file(string $name, array $config): string
{
    $dir = (string) ($config['storage_dir'] ?? (__DIR__ . '/../storage'));
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
    return rtrim($dir, '/\\') . DIRECTORY_SEPARATOR . $name;
}

function regresja_append_jsonl(string $name, array $row, array $config): void
{
    $file = regresja_storage_file($name, $config);
    $line = json_encode($row, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;
    file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
}

function regresja_sanitize_scalar(mixed $value, int $max = 500): string
{
    $text = is_scalar($value) ? (string) $value : '';
    $text = trim(strip_tags($text));
    if (function_exists('mb_substr')) {
        return mb_substr($text, 0, $max);
    }
    return substr($text, 0, $max);
}

function regresja_ip_hash(array $config): string
{
    $ip = regresja_client_ip();
    $secret = (string) ($config['stats_secret'] ?? '');
    if ($ip === '' || $secret === '') {
        return '';
    }
    return hash_hmac('sha256', $ip, $secret);
}

function regresja_geo_value(array $config, string $field, int $max = 80): string
{
    $headers = $config['geo_headers'][$field] ?? [];
    if (!is_array($headers)) {
        return '';
    }
    foreach ($headers as $header) {
        $value = regresja_sanitize_scalar($_SERVER[(string) $header] ?? '', $max);
        if ($value !== '') {
            return $value;
        }
    }
    return '';
}

function regresja_geo(array $config): array
{
    return [
        'country' => regresja_geo_value($config, 'country', 80),
        'city' => regresja_geo_value($config, 'city', 120),
        'region' => regresja_geo_value($config, 'region', 120),
    ];
}

function regresja_country(?array $config = null): string
{
    $config = $config ?? regresja_config();
    $country = regresja_geo_value($config, 'country', 80);
    if ($country !== '') {
        return $country;
    }
    return regresja_sanitize_scalar($_SERVER['HTTP_CF_IPCOUNTRY'] ?? $_SERVER['GEOIP_COUNTRY_CODE'] ?? '', 8);
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

function regresja_parse_date(?string $value, bool $endOfDay = false): ?DateTimeImmutable
{
    $value = trim((string) $value);
    if ($value === '') {
        return null;
    }
    try {
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value) === 1) {
            $date = new DateTimeImmutable($value, new DateTimeZone('UTC'));
            return $endOfDay ? $date->setTime(23, 59, 59) : $date->setTime(0, 0, 0);
        }
        return new DateTimeImmutable($value, new DateTimeZone('UTC'));
    } catch (Throwable) {
        return null;
    }
}

function regresja_range_bounds(string $range, ?string $from = null, ?string $to = null): array
{
    $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
    if ($range === 'custom') {
        $customFrom = regresja_parse_date($from, false) ?? $now->modify('-7 days');
        $customTo = regresja_parse_date($to, true) ?? $now;
        if ($customTo < $customFrom) {
            [$customFrom, $customTo] = [$customTo, $customFrom];
        }
        return [$customFrom, $customTo];
    }

    $since = match ($range) {
        'today' => $now->setTime(0, 0),
        '24h' => $now->modify('-24 hours'),
        '7d' => $now->modify('-7 days'),
        '31d' => $now->modify('-31 days'),
        '1y' => $now->modify('-1 year'),
        default => $now->modify('-7 days'),
    };
    return [$since, $now];
}

function regresja_filter_between(array $rows, DateTimeImmutable $since, DateTimeImmutable $until, bool $skipIgnored = true): array
{
    return array_values(array_filter($rows, function (array $row) use ($since, $until, $skipIgnored): bool {
        if ($skipIgnored && (($row['ignored'] ?? false) === true || ($row['ignored'] ?? '') === '1')) {
            return false;
        }
        $ts = $row['ts'] ?? '';
        if ($ts === '') {
            return false;
        }
        try {
            $date = new DateTimeImmutable((string) $ts);
            return $date >= $since && $date <= $until;
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
        if ($value === '') {
            $value = '(brak)';
        }
        $counts[$value] = ($counts[$value] ?? 0) + 1;
    }
    arsort($counts);
    return array_slice($counts, 0, $limit, true);
}

function regresja_events_by_hour(array $events): array
{
    $hours = [];
    foreach ($events as $event) {
        try {
            $hour = (new DateTimeImmutable((string) ($event['ts'] ?? '')))->format('Y-m-d H:00');
        } catch (Throwable) {
            continue;
        }
        if (!isset($hours[$hour])) {
            $hours[$hour] = ['events' => 0, 'pageViews' => 0, 'ctaClicks' => 0, 'leads' => 0];
        }
        $hours[$hour]['events']++;
        if (($event['event'] ?? '') === 'page_view') {
            $hours[$hour]['pageViews']++;
        }
        if (($event['event'] ?? '') === 'cta_click') {
            $hours[$hour]['ctaClicks']++;
        }
    }
    ksort($hours);
    return $hours;
}

function regresja_session_summaries(array $events, int $limit = 100): array
{
    $sessions = [];
    foreach ($events as $event) {
        $id = (string) ($event['sessionId'] ?? '');
        if ($id === '') {
            continue;
        }
        if (!isset($sessions[$id])) {
            $sessions[$id] = [
                'sessionId' => $id,
                'firstSeen' => (string) ($event['ts'] ?? ''),
                'lastSeen' => (string) ($event['ts'] ?? ''),
                'entryPage' => (string) ($event['entryPage'] ?? $event['page'] ?? ''),
                'pages' => [],
                'pageViews' => 0,
                'ctaClicks' => 0,
                'durationSeconds' => 0,
                'country' => (string) ($event['country'] ?? ''),
                'city' => (string) ($event['city'] ?? ''),
                'referrer' => (string) ($event['referrer'] ?? ''),
            ];
        }
        $sessions[$id]['lastSeen'] = (string) ($event['ts'] ?? $sessions[$id]['lastSeen']);
        $page = (string) ($event['page'] ?? '');
        if ($page !== '' && !in_array($page, $sessions[$id]['pages'], true)) {
            $sessions[$id]['pages'][] = $page;
        }
        if (($event['event'] ?? '') === 'page_view') {
            $sessions[$id]['pageViews']++;
        }
        if (($event['event'] ?? '') === 'cta_click') {
            $sessions[$id]['ctaClicks']++;
        }
        $sessions[$id]['durationSeconds'] += max(0, (int) ($event['durationSeconds'] ?? 0));
        if ($sessions[$id]['country'] === '' && ($event['country'] ?? '') !== '') {
            $sessions[$id]['country'] = (string) $event['country'];
        }
        if ($sessions[$id]['city'] === '' && ($event['city'] ?? '') !== '') {
            $sessions[$id]['city'] = (string) $event['city'];
        }
    }
    uasort($sessions, fn(array $a, array $b): int => strcmp((string) $b['lastSeen'], (string) $a['lastSeen']));
    return array_slice(array_values($sessions), 0, $limit);
}

function regresja_stats_payload(array $config, string $range = '7d', ?string $from = null, ?string $to = null, bool $includeRecentLeads = true): array
{
    [$since, $until] = regresja_range_bounds($range, $from, $to);
    $events = regresja_filter_between(regresja_read_jsonl('events.jsonl', $config), $since, $until);
    $leads = regresja_filter_between(regresja_read_jsonl('leads.jsonl', $config), $since, $until);
    $pageViews = array_values(array_filter($events, fn($e) => ($e['event'] ?? '') === 'page_view'));
    $ctaClicks = array_values(array_filter($events, fn($e) => ($e['event'] ?? '') === 'cta_click'));
    $leadSubmits = array_values(array_filter($events, fn($e) => ($e['event'] ?? '') === 'lead_submit'));
    $sessionIds = [];
    foreach ($events as $event) {
        $sessionId = (string) ($event['sessionId'] ?? '');
        if ($sessionId !== '') {
            $sessionIds[$sessionId] = true;
        }
    }
    $sessions = regresja_session_summaries($events, 200);
    $duration = array_sum(array_map(fn($e): int => max(0, (int) ($e['durationSeconds'] ?? 0)), $events));
    $hours = regresja_events_by_hour($events);
    foreach ($leads as $lead) {
        try {
            $hour = (new DateTimeImmutable((string) ($lead['ts'] ?? '')))->format('Y-m-d H:00');
        } catch (Throwable) {
            continue;
        }
        if (!isset($hours[$hour])) {
            $hours[$hour] = ['events' => 0, 'pageViews' => 0, 'ctaClicks' => 0, 'leads' => 0];
        }
        $hours[$hour]['leads']++;
    }
    ksort($hours);

    return [
        'ok' => true,
        'range' => $range,
        'from' => $since->format(DateTimeInterface::ATOM),
        'to' => $until->format(DateTimeInterface::ATOM),
        'summary' => [
            'events' => count($events),
            'pageViews' => count($pageViews),
            'ctaClicks' => count($ctaClicks),
            'leadSubmitEvents' => count($leadSubmits),
            'leads' => count($leads),
            'sessions' => count($sessionIds),
            'totalDurationSeconds' => $duration,
            'avgSessionSeconds' => count($sessionIds) > 0 ? (int) round($duration / count($sessionIds)) : 0,
        ],
        'topPages' => regresja_top($pageViews, 'page'),
        'topLandingPages' => regresja_top($events, 'entryPage'),
        'topReferrers' => regresja_top($events, 'referrer'),
        'countries' => regresja_top(array_merge($events, $leads), 'country'),
        'cities' => regresja_top(array_merge($events, $leads), 'city'),
        'devices' => regresja_top($events, 'device'),
        'hours' => $hours,
        'sessionsList' => $sessions,
        'recentLeads' => $includeRecentLeads ? array_slice(array_reverse($leads), 0, 50) : [],
    ];
}

function regresja_export_payload(array $config, string $range = '7d', ?string $from = null, ?string $to = null): array
{
    $payload = regresja_stats_payload($config, $range, $from, $to, true);
    [$since, $until] = regresja_range_bounds($range, $from, $to);
    $payload['events'] = regresja_filter_between(regresja_read_jsonl('events.jsonl', $config), $since, $until);
    $payload['leads'] = regresja_filter_between(regresja_read_jsonl('leads.jsonl', $config), $since, $until);
    $payload['exportedAt'] = gmdate('c');
    return $payload;
}

function regresja_encrypt_payload(array $payload, array $config): array
{
    $keyRaw = (string) ($config['export_encryption_key'] ?? '');
    $key = base64_decode($keyRaw, true);
    if (!is_string($key) || strlen($key) !== 32) {
        regresja_json_response(['ok' => false, 'error' => 'export_encryption_not_configured'], 503);
    }
    if (!function_exists('openssl_encrypt')) {
        regresja_json_response(['ok' => false, 'error' => 'openssl_missing'], 503);
    }
    $iv = random_bytes(12);
    $tag = '';
    $plain = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $cipher = openssl_encrypt($plain, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    if ($cipher === false) {
        regresja_json_response(['ok' => false, 'error' => 'encryption_failed'], 500);
    }
    return [
        'ok' => true,
        'encrypted' => true,
        'alg' => 'AES-256-GCM',
        'iv' => base64_encode($iv),
        'tag' => base64_encode($tag),
        'data' => base64_encode($cipher),
    ];
}
