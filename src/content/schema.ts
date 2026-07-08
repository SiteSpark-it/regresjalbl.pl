import { siteData, type FaqItem } from './siteData';

export interface BreadcrumbItem {
  href: string;
  label: string;
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.name,
    url: siteData.domain,
    inLanguage: siteData.language
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteData.author.name,
    url: siteData.personalLink.url,
    description: siteData.author.description,
    sameAs: [siteData.personalLink.url]
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.name,
    url: siteData.domain,
    logo: new URL('/favicon.svg', siteData.domain).toString()
  };
}

export function serviceSchema(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Autorska sesja regresji duchowej Brama Dusz LBL™',
    serviceType: 'Sesja rozwojowa i duchowa',
    provider: {
      '@type': 'Person',
      name: siteData.author.name,
      url: siteData.personalLink.url
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska'
    },
    url: new URL(path, siteData.domain).toString(),
    description:
      'Autorska metoda regresji duchowej inspirowana publikacjami dr. Michaela Newtona, prowadzona jako praca rozwojowa i duchowa.'
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  const trail = [{ href: '/', label: 'Strona główna' }, ...items];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.href, siteData.domain).toString()
    }))
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function articleSchema(path: string, headline: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url: new URL(path, siteData.domain).toString(),
    inLanguage: siteData.language,
    author: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.domain
    },
    publisher: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.domain
    }
  };
}
