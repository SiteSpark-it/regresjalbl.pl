<?php
// Copy this file to public/api/config.php on Hostinger and change every value below.
// Do not commit config.php with real secrets.

return [
    'admin_password_hash' => '$2y$10$replace_this_hash_with_password_hash',
    'stats_secret' => 'replace-with-long-random-secret',
    'storage_dir' => __DIR__ . '/../storage',
    'notification_email' => 'info@instytutregresji.pl',
    'ignored_ips' => [],
    'allowed_hosts' => ['regresjalbl.pl', 'www.regresjalbl.pl', '127.0.0.1', 'localhost'],
];
