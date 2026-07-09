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

1. Uruchom `npm install`, a potem `npm run build`.
2. Wejdź do panelu Hostingera i otwórz menedżer plików albo połącz się przez FTP/SFTP.
3. Wgraj zawartość folderu `dist` do katalogu domeny, zwykle `public_html`.
4. Upewnij się, że w katalogu docelowym znajdują się pliki `index.html`, `robots.txt`, `sitemap.xml`, `favicon.svg` oraz folder `_astro`.
5. Po wdrożeniu sprawdź:
   - `https://regresjalbl.pl/`
   - `https://regresjalbl.pl/sitemap.xml`
   - `https://regresjalbl.pl/robots.txt`

## Edycja treści

- Dane strony, linki, CTA, telefon i e-mail: `src/content/siteData.ts`
- Meta tagi i JSON-LD: `src/components/SEO.astro` oraz `src/content/schema.ts`
- Główna strona: `src/pages/index.astro`
- Komponenty UI: `src/components`

## Uwagi prawne

Treści celowo odróżniają edukacyjne użycie pojęć LBL i Life Between Lives od oficjalnych usług The Michael Newton Institute. Przed publikacją produkcyjną uzupełnij dane kontaktowe i politykę prywatności.
