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

$allowedEvents = ['page_view', 'page_leave', 'cta_click', 'lead_submit'];
if (!in_array($event, $allowedEvents, true)) {
    regresja_json_response(['ok' => false, 'error' => 'event_not_allowed'], 400);
}

$row = [
    'ts' => gmdate('c'),
    'event' => $event,
    'sessionId' => regresja_sanitize_scalar($data['sessionId'] ?? '', 80),
    'page' => regresja_sanitize_scalar($data['page'] ?? '', 180),
    'title' => regresja_sanitize_scalar($data['title'] ?? '', 180),
    'referrer' => regresja_sanitize_scalar($data['referrer'] ?? '', 300),
    'search' => regresja_sanitize_scalar($data['search'] ?? '', 250),
    'hash' => regresja_sanitize_scalar($data['hash'] ?? '', 120),
    'language' => regresja_sanitize_scalar($data['language'] ?? '', 30),
    'timezone' => regresja_sanitize_scalar($data['timezone'] ?? '', 80),
    'viewport' => regresja_sanitize_scalar($data['viewport'] ?? '', 30),
    'screen' => regresja_sanitize_scalar($data['screen'] ?? '', 30),
    'href' => regresja_sanitize_scalar($data['href'] ?? '', 300),
    'text' => regresja_sanitize_scalar($data['text'] ?? '', 160),
    'durationSeconds' => max(0, min(86400, (int) ($data['durationSeconds'] ?? 0))),
    'scrollDepth' => max(0, min(100, (int) ($data['scrollDepth'] ?? 0))),
    'country' => regresja_country(),
    'ipHash' => regresja_ip_hash($config),
];

regresja_append_jsonl('events.jsonl', $row, $config);
regresja_json_response(['ok' => true]);
