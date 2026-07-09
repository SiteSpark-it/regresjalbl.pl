<?php
declare(strict_types=1);

function regresja_config(): array
{
    $default = [
        'admin_password_hash' => '',
        'stats_secret' => '',
        'storage_dir' => __DIR__ . '/../storage',
        'notification_email' => 'info@instytutregresji.pl',
        'ignored_ips' => [],
        'allowed_hosts' => ['regresjalbl.pl', 'www.regresjalbl.pl', '127.0.0.1', 'localhost'],
    ];
    $customPath = __DIR__ . '/config.php';
    if (is_file($customPath)) {
        $custom = require $customPath;
        if (is_array($custom)) {
            return array_replace($default, $custom);
        }
    }
    return $default;
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
    return $ip !== '' && in_array($ip, $config['ignored_ips'] ?? [], true);
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

function regresja_country(): string
{
    return regresja_sanitize_scalar($_SERVER['HTTP_CF_IPCOUNTRY'] ?? $_SERVER['GEOIP_COUNTRY_CODE'] ?? '', 8);
}
