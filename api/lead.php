<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    regresja_json_response(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$config = regresja_config();
$data = regresja_request_json();

if (regresja_sanitize_scalar($data['website'] ?? '', 200) !== '') {
    regresja_json_response(['ok' => true, 'spam' => true]);
}

$name = regresja_sanitize_scalar($data['name'] ?? '', 80);
$email = regresja_sanitize_scalar($data['email'] ?? '', 140);
$phone = regresja_sanitize_scalar($data['phone'] ?? '', 60);
$message = regresja_sanitize_scalar($data['message'] ?? '', 1600);
$consent = regresja_sanitize_scalar($data['consent'] ?? '', 20);

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '' || $consent !== 'yes') {
    regresja_json_response(['ok' => false, 'error' => 'missing_required_fields'], 422);
}

$row = [
    'ts' => gmdate('c'),
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'preferred_contact' => regresja_sanitize_scalar($data['preferred_contact'] ?? '', 40),
    'topic' => regresja_sanitize_scalar($data['topic'] ?? '', 80),
    'message' => $message,
    'page' => regresja_sanitize_scalar($data['page'] ?? '', 180),
    'referrer' => regresja_sanitize_scalar($data['referrer'] ?? '', 300),
    'timezone' => regresja_sanitize_scalar($data['timezone'] ?? '', 80),
    'screen' => regresja_sanitize_scalar($data['screen'] ?? '', 30),
    'country' => regresja_country(),
    'ipHash' => regresja_ip_hash($config),
];

regresja_append_jsonl('leads.jsonl', $row, $config);

$to = (string) ($config['notification_email'] ?? 'info@instytutregresji.pl');
$subject = 'Nowa konsultacja z regresjalbl.pl';
$body = "Nowe zgłoszenie konsultacji\n\n"
    . "Imię: {$row['name']}\n"
    . "E-mail: {$row['email']}\n"
    . "Telefon: {$row['phone']}\n"
    . "Preferowany kontakt: {$row['preferred_contact']}\n"
    . "Temat: {$row['topic']}\n"
    . "Strona: {$row['page']}\n\n"
    . "Wiadomość:\n{$row['message']}\n";
$headers = [
    'From: regresjalbl.pl <no-reply@regresjalbl.pl>',
    'Reply-To: ' . $row['email'],
    'Content-Type: text/plain; charset=UTF-8',
];

if (filter_var($to, FILTER_VALIDATE_EMAIL)) {
    @mail($to, $subject, $body, implode("\r\n", $headers));
}

regresja_json_response(['ok' => true]);
