# regresjalbl.pl

Statyczna strona SEO w Astro + Tailwind CSS dla domeny `regresjalbl.pl`.

## Wymagania

- Node.js 18+ albo nowszy
- npm

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Domyślnie Astro uruchomi stronę pod adresem podanym w terminalu, zwykle `http://localhost:4321`.

## Build produkcyjny

```bash
npm run build
npm run preview
```

Gotowa statyczna wersja strony powstaje w folderze `dist`.

## Wdrożenie na Hostinger

Najprostszy wariant: podepnij w Hostingerze repozytorium GitHub:

```text
https://github.com/SiteSpark-it/regresjalbl.pl
```

Jako gałąź wdrożeniową wybierz:

```text
hostinger-dist
```

Ta gałąź zawiera już gotową zawartość folderu `dist`, więc w Hostingerze nie trzeba uruchamiać buildu Astro. Katalog publikacji ustaw na katalog domeny, zwykle `public_html`.

Wariant ręczny, jeśli nie używasz wdrożenia z GitHub:

1. Uruchom `npm install`, a potem `npm run build`.
2. Wejdź do panelu Hostingera i otwórz menedżer plików albo połącz się przez FTP/SFTP.
3. Wgraj zawartość folderu `dist` do katalogu domeny, zwykle `public_html`.
4. Upewnij się, że w katalogu docelowym znajdują się pliki `index.html`, `robots.txt`, `sitemap.xml`, `favicon.svg` oraz folder `_astro`.
5. Po wdrożeniu sprawdź:
   - `https://regresjalbl.pl/`
   - `https://regresjalbl.pl/sitemap.xml`
   - `https://regresjalbl.pl/robots.txt`

## Formularz, analityka i panel

Strona zawiera lekki formularz konsultacji oraz własną analitykę uruchamianą po zgodzie użytkownika.

Po wdrożeniu na Hostinger:

1. Skopiuj `api/config.example.php` do `api/config.php`.
2. Ustaw `stats_secret` na długi losowy sekret.
3. Ustaw `export_secret` na drugi długi losowy sekret dla centralnego eksportu.
4. Wygeneruj `export_encryption_key` i wpisz go w konfiguracji.
5. Wygeneruj hash hasła panelu i wpisz go jako `admin_password_hash`.
6. Opcjonalnie ustaw `storage_dir` poza katalogiem publicznym, jeżeli hosting na to pozwala.
7. Panel statystyk będzie dostępny pod `/admin/`.
8. Endpoint JSON statystyk: `/api/stats.php?range=7d&key=TWÓJ_SEKRET`.
9. Endpoint szyfrowanego eksportu: `/api/export.php?range=7d&key=TWÓJ_EXPORT_SECRET`.

Wygenerowanie hasha hasła w PHP:

```bash
php -r "echo password_hash('TU_WPISZ_HASLO', PASSWORD_DEFAULT), PHP_EOL;"
```

Wygenerowanie klucza szyfrowania eksportu:

```bash
php -r "echo base64_encode(random_bytes(32)), PHP_EOL;"
```

Zakresy statystyk:

```text
/api/stats.php?range=today&key=TWÓJ_SEKRET
/api/stats.php?range=24h&key=TWÓJ_SEKRET
/api/stats.php?range=7d&key=TWÓJ_SEKRET
/api/stats.php?range=31d&key=TWÓJ_SEKRET
/api/stats.php?range=1y&key=TWÓJ_SEKRET
/api/stats.php?range=custom&from=2026-07-01&to=2026-07-09&key=TWÓJ_SEKRET
```

Szyfrowany eksport dla centralnego panelu:

```text
/api/export.php?range=7d&key=TWÓJ_EXPORT_SECRET
/api/export.php?range=custom&from=2026-07-01&to=2026-07-09&key=TWÓJ_EXPORT_SECRET
```

Wyłączenie pomiaru na własnym urządzeniu:

```text
https://regresjalbl.pl/?analytics_ignore=1
```

Serwerowe wykluczenie własnego IP:

```php
'ignored_ips' => ['TWOJE_PUBLICZNE_IP'],
```

Analityka nie zapisuje surowego IP w panelu statystyk. Jeśli w `config.php` podasz `stats_secret`, endpoint zapisuje tylko hash IP do rozróżniania sesji. Miasto, region i kraj są zapisywane tylko wtedy, gdy hosting albo proxy udostępnia odpowiednie nagłówki, np. `HTTP_CF_IPCOUNTRY`, `HTTP_CF_IPCITY`, `GEOIP_CITY`.

## Edycja treści

- Dane strony, linki, CTA, telefon i e-mail: `src/content/siteData.ts`
- Meta tagi i JSON-LD: `src/components/SEO.astro` oraz `src/content/schema.ts`
- Główna strona: `src/pages/index.astro`
- Komponenty UI: `src/components`

## Uwagi prawne

Treści celowo odróżniają edukacyjne użycie pojęć LBL i Life Between Lives od oficjalnych usług The Michael Newton Institute. Przed publikacją produkcyjną uzupełnij dane kontaktowe i politykę prywatności.
