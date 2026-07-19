<?php
header('X-Robots-Tag: noindex, nofollow', true);
declare(strict_types=1);

require __DIR__ . '/../api/bootstrap.php';
session_start();

$config = regresja_config();
$hash = (string) ($config['admin_password_hash'] ?? '');

function admin_h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
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
$from = regresja_sanitize_scalar($_GET['from'] ?? '', 40);
$to = regresja_sanitize_scalar($_GET['to'] ?? '', 40);
$stats = $isAuthed ? regresja_stats_payload($config, $range, $from, $to, true) : [];
$summary = $stats['summary'] ?? [];
$recentLeads = $stats['recentLeads'] ?? [];
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
      <p>Skopiuj <code>/api/config.example.php</code> do <code>/api/config.php</code> na Hostingerze i ustaw <code>admin_password_hash</code>, <code>stats_secret</code>, <code>export_secret</code> oraz <code>export_encryption_key</code>.</p>
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
    <form class="card" method="get" style="margin-bottom:1rem">
      <input type="hidden" name="range" value="custom">
      <strong>Zakres własny</strong>
      <div class="nav" style="margin-bottom:0">
        <label>Od<br><input type="date" name="from" value="<?= admin_h($from) ?>"></label>
        <label>Do<br><input type="date" name="to" value="<?= admin_h($to) ?>"></label>
        <button class="btn" type="submit">Pokaż zakres</button>
      </div>
      <p class="muted">Aktualnie: <?= admin_h((string)($stats['from'] ?? '')) ?> - <?= admin_h((string)($stats['to'] ?? '')) ?></p>
    </form>
    <section class="grid stats">
      <div class="card"><div class="num"><?= (int)($summary['pageViews'] ?? 0) ?></div><div class="muted">odsłon</div></div>
      <div class="card"><div class="num"><?= (int)($summary['sessions'] ?? 0) ?></div><div class="muted">sesji</div></div>
      <div class="card"><div class="num"><?= (int)($summary['ctaClicks'] ?? 0) ?></div><div class="muted">kliknięć CTA</div></div>
      <div class="card"><div class="num"><?= (int)($summary['leads'] ?? 0) ?></div><div class="muted">zgłoszeń</div></div>
      <div class="card"><div class="num"><?= round(((int)($summary['totalDurationSeconds'] ?? 0)) / 60) ?></div><div class="muted">minut łącznie</div></div>
      <div class="card"><div class="num"><?= round(((int)($summary['avgSessionSeconds'] ?? 0)) / 60) ?></div><div class="muted">min / sesja</div></div>
    </section>
    <section class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-top:1rem">
      <div class="card"><h2>Top strony</h2><table><?php foreach (($stats['topPages'] ?? []) as $k=>$v): ?><tr><td><?= admin_h((string)$k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Landing pages</h2><table><?php foreach (($stats['topLandingPages'] ?? []) as $k=>$v): ?><tr><td><?= admin_h((string)$k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Źródła</h2><table><?php foreach (($stats['topReferrers'] ?? []) as $k=>$v): ?><tr><td><?= admin_h((string)$k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Kraje</h2><table><?php foreach (($stats['countries'] ?? []) as $k=>$v): ?><tr><td><?= admin_h((string)$k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Miasta</h2><table><?php foreach (($stats['cities'] ?? []) as $k=>$v): ?><tr><td><?= admin_h((string)$k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
      <div class="card"><h2>Urządzenia</h2><table><?php foreach (($stats['devices'] ?? []) as $k=>$v): ?><tr><td><?= admin_h((string)$k) ?></td><td><?= (int)$v ?></td></tr><?php endforeach; ?></table></div>
    </section>
    <section class="card" style="margin-top:1rem">
      <h2>Godziny</h2>
      <table>
        <tr><th>Godzina UTC</th><th>Odsłony</th><th>CTA</th><th>Leady</th><th>Eventy</th></tr>
        <?php foreach (array_slice(array_reverse($stats['hours'] ?? [], true), 0, 48, true) as $hour => $row): ?>
          <tr>
            <td><?= admin_h((string)$hour) ?></td>
            <td><?= (int)($row['pageViews'] ?? 0) ?></td>
            <td><?= (int)($row['ctaClicks'] ?? 0) ?></td>
            <td><?= (int)($row['leads'] ?? 0) ?></td>
            <td><?= (int)($row['events'] ?? 0) ?></td>
          </tr>
        <?php endforeach; ?>
      </table>
    </section>
    <section class="card" style="margin-top:1rem">
      <h2>Ostatnie sesje</h2>
      <table>
        <tr><th>Ostatnio</th><th>Wejście</th><th>Strony</th><th>Czas</th><th>Lokalizacja</th></tr>
        <?php foreach (array_slice($stats['sessionsList'] ?? [], 0, 30) as $session): ?>
          <tr>
            <td><?= admin_h((string)($session['lastSeen'] ?? '')) ?></td>
            <td><?= admin_h((string)($session['entryPage'] ?? '')) ?><br><span class="muted"><?= admin_h((string)($session['referrer'] ?? '')) ?></span></td>
            <td><?= admin_h(implode(' → ', array_slice((array)($session['pages'] ?? []), 0, 8))) ?></td>
            <td><?= round(((int)($session['durationSeconds'] ?? 0)) / 60) ?> min<br><?= (int)($session['pageViews'] ?? 0) ?> odsł.</td>
            <td><?= admin_h(trim((string)($session['city'] ?? '') . ' ' . (string)($session['country'] ?? ''))) ?></td>
          </tr>
        <?php endforeach; ?>
      </table>
    </section>
    <section class="card" style="margin-top:1rem">
      <h2>Ostatnie zgłoszenia</h2>
      <table>
        <tr><th>Czas</th><th>Kontakt</th><th>Temat</th><th>Wiadomość</th></tr>
        <?php foreach ($recentLeads as $lead): ?>
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
