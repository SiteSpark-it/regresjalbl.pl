<?php
declare(strict_types=1);

require __DIR__ . '/../api/bootstrap.php';
session_start();

$config = regresja_config();
$hash = (string) ($config['admin_password_hash'] ?? '');

function admin_h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function admin_read_jsonl(string $name, array $config): array
{
    $file = regresja_storage_file($name, $config);
    if (!is_file($file)) return [];
    $rows = [];
    $handle = fopen($file, 'rb');
    if (!$handle) return [];
    while (($line = fgets($handle)) !== false) {
        $row = json_decode(trim($line), true);
        if (is_array($row)) $rows[] = $row;
    }
    fclose($handle);
    return $rows;
}

function admin_since(string $range): DateTimeImmutable
{
    $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
    return match ($range) {
        'today' => $now->setTime(0, 0),
        '24h' => $now->modify('-24 hours'),
        '7d' => $now->modify('-7 days'),
        '31d' => $now->modify('-31 days'),
        '1y' => $now->modify('-1 year'),
        default => $now->modify('-7 days'),
    };
}

function admin_filter(array $rows, DateTimeImmutable $since): array
{
    return array_values(array_filter($rows, function (array $row) use ($since): bool {
        try {
            return new DateTimeImmutable((string) ($row['ts'] ?? '')) >= $since;
        } catch (Throwable) {
            return false;
        }
    }));
}

function admin_top(array $rows, string $field): array
{
    $counts = [];
    foreach ($rows as $row) {
        $value = trim((string) ($row[$field] ?? ''));
        if ($value === '') $value = '(brak)';
        $counts[$value] = ($counts[$value] ?? 0) + 1;
    }
    arsort($counts);
    return array_slice($counts, 0, 10, true);
}

if (isset($_POST['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: /admin/');
    exit;
}

if ($hash !== '' && isset($_POST['password']) && password_verify((string) $_POST['password'], $hash)) {
    $_SESSION['regresja_admin'] = true;
    header('Location: /admin/');
    exit;
}

$isAuthed = $hash !== '' && ($_SESSION['regresja_admin'] ?? false) === true;
$range = regresja_sanitize_scalar($_GET['range'] ?? '7d', 20);
$since = admin_since($range);
$events = $isAuthed ? admin_filter(admin_read_jsonl('events.jsonl', $config), $since) : [];
$leads = $isAuthed ? admin_filter(admin_read_jsonl('leads.jsonl', $config), $since) : [];
$sessions = [];
$duration = 0;
foreach ($events as $event) {
    if (($event['sessionId'] ?? '') !== '') $sessions[(string) $event['sessionId']] = true;
    $duration += (int) ($event['durationSeconds'] ?? 0);
}
$pageViews = array_values(array_filter($events, fn($e) => ($e['event'] ?? '') === 'page_view'));
$ctaClicks = array_values(array_filter($events, fn($e) => ($e['event'] ?? '') === 'cta_click'));
?>
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Panel regresjalbl.pl</title>
  <style>
    body{margin:0;background:#fbf4e9;color:#172a3a;font-family:system-ui,-apple-system,Segoe UI,sans-serif}
    main{width:min(100% - 2rem,76rem);margin:0 auto;padding:2rem 0 4rem}
    a{color:#2d7089;font-weight:700} .top{display:flex;justify-content:space-between;gap:1rem;align-items:center}
    .card{border:1px solid rgba(31,56,75,.12);background:#fffaf2;border-radius:10px;padding:1rem;box-shadow:0 16px 42px rgba(31,56,75,.08)}
    .grid{display:grid;gap:1rem}.stats{grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}
    .num{font-size:2rem;font-weight:900}.muted{color:#51606a}.nav{display:flex;gap:.5rem;flex-wrap:wrap;margin:1rem 0 1.5rem}
    .nav a,.btn{border:1px solid rgba(31,56,75,.14);border-radius:6px;background:#eaf6f8;padding:.65rem .9rem;text-decoration:none;color:#172a3a}
    table{width:100%;border-collapse:collapse}td,th{padding:.7rem;border-bottom:1px solid rgba(31,56,75,.1);text-align:left;vertical-align:top}th{font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:#51606a}
    input{border:1px solid rgba(31,56,75,.16);border-radius:6px;padding:.8rem;width:min(100%,24rem)}button{cursor:pointer}
  </style>
</head>
<body>
<main>
  <div class="top">
    <div>
      <h1>Panel regresjalbl.pl</h1>
      <p class="muted">Statystyki odwiedzin i zgłoszenia konsultacji.</p>
    </div>
    <?php if ($isAuthed): ?>
      <form method="post"><button class="btn" name="logout" value="1">Wyloguj</button></form>
    <?php endif; ?>
  </div>

  <?php if ($hash === '' || str_contains($hash, 'replace_this_hash')): ?>
    <section class="card">
      <h2>Panel wymaga konfiguracji</h2>
      <p>Skopiuj <code>/api/config.example.php</code> do <code>/api/config.php</code> na Hostingerze i ustaw <code>admin_password_hash</code> oraz <code>stats_secret</code>.</p>
    </section>
  <?php elseif (!$isAuthed): ?>
    <section class="card">
      <h2>Logowanie</h2>
      <form method="post" class="grid">
        <label>Hasło panelu<br><input type="password" name="password" required autofocus></label>
        <button class="btn" type="submit">Zaloguj</button>
      </form>
    </section>
  <?php else: ?>
    <nav class="nav" aria-label="Zakres statystyk">
      <?php foreach (['today'=>'Dziś','24h'=>'24h','7d'=>'7 dni','31d'=>'31 dni','1y'=>'1 rok'] as $key => $label): ?>
        <a href="?range=<?= admin_h($key) ?>"><?= admin_h($label) ?></a>
      <?php endforeach; ?>
    </nav>
    <section class="grid stats">
      <div class="card"><div class="num"><?= count($pageViews) ?></div><div class="muted">odsłon</div></div>
      <div class="card"><div class="num"><?= count($sessions) ?></div><div class="muted">sesji</div></div>
      <div class="card"><div class="num"><?= count($ctaClicks) ?></div><div class="muted">kliknięć CTA</div></div>
      <div class="card"><div class="num"><?= count($leads) ?></div><div class="muted">zgłoszeń</div></div>
      <div class="card"><div class="num"><?= round($duration / 60) ?></div><div class="muted">minut łącznie</div></div>
    </section>
    <section class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-top:1rem">
      <div class="card"><h2>Top strony</h2><table><?php foreach (admin_top($pageViews, 'page') as $k=>$v): ?><tr><td><?= admin_h($k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Źródła</h2><table><?php foreach (admin_top($events, 'referrer') as $k=>$v): ?><tr><td><?= admin_h($k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Kraje</h2><table><?php foreach (admin_top(array_merge($events, $leads), 'country') as $k=>$v): ?><tr><td><?= admin_h($k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
    </section>
    <section class="card" style="margin-top:1rem">
      <h2>Ostatnie zgłoszenia</h2>
      <table>
        <tr><th>Czas</th><th>Kontakt</th><th>Temat</th><th>Wiadomość</th></tr>
        <?php foreach (array_slice(array_reverse($leads), 0, 20) as $lead): ?>
          <tr>
            <td><?= admin_h((string)($lead['ts'] ?? '')) ?></td>
            <td><?= admin_h((string)($lead['name'] ?? '')) ?><br><?= admin_h((string)($lead['email'] ?? '')) ?><br><?= admin_h((string)($lead['phone'] ?? '')) ?></td>
            <td><?= admin_h((string)($lead['topic'] ?? '')) ?></td>
            <td><?= nl2br(admin_h((string)($lead['message'] ?? ''))) ?></td>
          </tr>
        <?php endforeach; ?>
      </table>
    </section>
  <?php endif; ?>
</main>
</body>
</html>
