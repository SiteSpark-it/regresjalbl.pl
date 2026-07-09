<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    regresja_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$config = regresja_config();
if (regresja_is_ignored_ip($config)) {
    regresja_json_response(['ok' => true, 'ignored' => true]);
}

$data = regresja_request_json();
$event = regresja_sanitize_scalar($data['event'] ?? '', 60);
if ($event === '') {
    regresja_json_response(['ok' => false, 'error' => 'missing_event'], 400);
}

$allowedEvents = ['page_view', 'page_leave', 'engagement_ping', 'cta_click', 'lead_submit', 'form_start'];
if (!in_array($event, $allowedEvents, true)) {
    regresja_json_response(['ok' => false, 'error' => 'event_not_allowed'], 400);
}

$geo = regresja_geo($config);
$row = [
    'ts' => gmdate('c'),
    'event' => $event,
    'sessionId' => regresja_sanitize_scalar($data['sessionId'] ?? '', 80),
    'sessionStartedAt' => regresja_sanitize_scalar($data['sessionStartedAt'] ?? '', 80),
    'pageStartedAt' => regresja_sanitize_scalar($data['pageStartedAt'] ?? '', 80),
    'pageSequence' => max(0, min(10000, (int) ($data['pageSequence'] ?? 0))),
    'entryPage' => regresja_sanitize_scalar($data['entryPage'] ?? '', 180),
    'previousPage' => regresja_sanitize_scalar($data['previousPage'] ?? '', 180),
    'page' => regresja_sanitize_scalar($data['page'] ?? '', 180),
    'title' => regresja_sanitize_scalar($data['title'] ?? '', 180),
    'referrer' => regresja_sanitize_scalar($data['referrer'] ?? '', 300),
    'search' => regresja_sanitize_scalar($data['search'] ?? '', 250),
    'hash' => regresja_sanitize_scalar($data['hash'] ?? '', 120),
    'language' => regresja_sanitize_scalar($data['language'] ?? '', 30),
    'timezone' => regresja_sanitize_scalar($data['timezone'] ?? '', 80),
    'viewport' => regresja_sanitize_scalar($data['viewport'] ?? '', 30),
    'screen' => regresja_sanitize_scalar($data['screen'] ?? '', 30),
    'device' => regresja_sanitize_scalar($data['device'] ?? '', 40),
    'utmSource' => regresja_sanitize_scalar($data['utmSource'] ?? '', 120),
    'utmMedium' => regresja_sanitize_scalar($data['utmMedium'] ?? '', 120),
    'utmCampaign' => regresja_sanitize_scalar($data['utmCampaign'] ?? '', 120),
    'href' => regresja_sanitize_scalar($data['href'] ?? '', 300),
    'text' => regresja_sanitize_scalar($data['text'] ?? '', 160),
    'durationSeconds' => max(0, min(86400, (int) ($data['durationSeconds'] ?? 0))),
    'activeSeconds' => max(0, min(86400, (int) ($data['activeSeconds'] ?? 0))),
    'scrollDepth' => max(0, min(100, (int) ($data['scrollDepth'] ?? 0))),
    'country' => $geo['country'],
    'city' => $geo['city'],
    'region' => $geo['region'],
    'ipHash' => regresja_ip_hash($config),
];

regresja_append_jsonl('events.jsonl', $row, $config);
regresja_json_response(['ok' => true]);
