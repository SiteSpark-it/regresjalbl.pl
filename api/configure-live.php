<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$statsSecret = trim((string) ($_POST['stats_secret'] ?? ''));
$exportSecret = trim((string) ($_POST['export_secret'] ?? ''));
$encryptionKey = trim((string) ($_POST['export_encryption_key'] ?? ''));
if (strlen($statsSecret) < 32 || strlen($exportSecret) < 32 || strlen($encryptionKey) < 32 || preg_match('/[\r\n]/', $statsSecret . $exportSecret . $encryptionKey)) {
    respond(400, ['ok' => false, 'error' => 'invalid_input']);
}

$expectedHash = '560230ab73c15f5c9c3b9e1387d4c3057051e5eb6c0d0ce3552bde0a988d992d';
if (!hash_equals($expectedHash, hash('sha256', $exportSecret))) {
    respond(403, ['ok' => false, 'error' => 'forbidden']);
}

$directory = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.regresjalbl-analytics';
if (!is_dir($directory) && !mkdir($directory, 0750, true) && !is_dir($directory)) {
    respond(500, ['ok' => false, 'error' => 'storage_unavailable']);
}

$config = [
    'stats_secret' => $statsSecret,
    'export_secret' => $exportSecret,
    'export_encryption_key' => $encryptionKey,
    'allow_plain_export' => false,
];
$file = $directory . DIRECTORY_SEPARATOR . 'config.php';
$code = "<?php\nreturn " . var_export($config, true) . ";\n";
if (file_put_contents($file, $code, LOCK_EX) === false) {
    respond(500, ['ok' => false, 'error' => 'write_failed']);
}
@chmod($file, 0600);
respond(200, ['ok' => true, 'configured' => true]);
