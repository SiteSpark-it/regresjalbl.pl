<?php
// Copy this file to public/api/config.php on Hostinger and change every value below.
// Do not commit config.php with real secrets.

return [
    'admin_password_hash' => '$2y$10$replace_this_hash_with_password_hash',
    'stats_secret' => 'replace-with-long-random-secret',
    'export_secret' => 'replace-with-second-long-random-secret',
    // Generate with: php -r "echo base64_encode(random_bytes(32)), PHP_EOL;"
    'export_encryption_key' => 'replace-with-base64-32-byte-key',
    'allow_plain_export' => false,
    'storage_dir' => __DIR__ . '/../storage',
    'notification_email' => 'info@instytutregresji.pl',
    // Add your public IP here if you want server-side exclusion.
    // Browser-side exclusion is also available at: https://regresjalbl.pl/?analytics_ignore=1
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
