<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$config = regresja_config();
$secret = (string) ($config['stats_secret'] ?? '');
$provided = $_SERVER['HTTP_X_REGRESJA_STATS_KEY'] ?? ($_GET['key'] ?? '');
if ($secret === '' || !hash_equals($secret, (string) $provided)) {
    regresja_json_response(['ok' => false, 'error' => 'unauthorized'], 401);
}

$range = regresja_sanitize_scalar($_GET['range'] ?? '7d', 20);
$from = regresja_sanitize_scalar($_GET['from'] ?? '', 40);
$to = regresja_sanitize_scalar($_GET['to'] ?? '', 40);

regresja_json_response(regresja_stats_payload($config, $range, $from, $to, true));
