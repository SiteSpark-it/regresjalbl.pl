import type { APIRoute } from 'astro';
import { knowledgeArticles } from '../content/articles';
import { siteData } from '../content/siteData';

export const prerender = true;

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-07-10' },
  { path: '/life-between-lives/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/regresja-miedzy-wcieleniami/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/regresja-poprzednich-wcielen/', priority: '0.8', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/brama-dusz-lbl/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/o-macieju/', priority: '0.7', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/sesja/', priority: '0.9', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/artykuly/', priority: '0.8', changefreq: 'weekly', lastmod: '2026-07-10' },
  { path: '/faq/', priority: '0.7', changefreq: 'monthly', lastmod: '2026-07-10' },
  { path: '/polityka-prywatnosci/', priority: '0.3', changefreq: 'yearly', lastmod: '2026-07-10' }
];

export const GET: APIRoute = () => {
  const pages = [
    ...staticPages,
    ...knowledgeArticles.map((article) => ({
      path: `/artykuly/${article.slug}/`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: article.modified
    }))
  ];

  const urls = pages
    .map(
      ({ path, priority, changefreq, lastmod }) => `  <url>
    <loc>${new URL(path, siteData.domain).toString()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
