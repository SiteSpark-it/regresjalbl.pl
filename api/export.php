<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$config = regresja_config();
$secret = (string) ($config['export_secret'] ?? '');
if ($secret === '') {
    $secret = (string) ($config['stats_secret'] ?? '');
}

$provided = $_SERVER['HTTP_X_REGRESJA_EXPORT_KEY'] ?? ($_GET['key'] ?? '');
if ($secret === '' || !hash_equals($secret, (string) $provided)) {
    regresja_json_response(['ok' => false, 'error' => 'unauthorized'], 401);
}

$range = regresja_sanitize_scalar($_GET['range'] ?? '7d', 20);
$from = regresja_sanitize_scalar($_GET['from'] ?? '', 40);
$to = regresja_sanitize_scalar($_GET['to'] ?? '', 40);
$payload = regresja_export_payload($config, $range, $from, $to);

if (($config['allow_plain_export'] ?? false) === true && ($_GET['plain'] ?? '') === '1') {
    regresja_json_response($payload);
}

regresja_json_response(regresja_encrypt_payload($payload, $config));
