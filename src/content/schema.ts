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
    inLanguage: siteData.language,
    description:
      'Edukacyjny przewodnik po regresji LBL, Life Between Lives, regresji między wcieleniami i metodzie Brama Dusz LBL.'
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteData.author.name,
    url: new URL('/o-macieju/', siteData.domain).toString(),
    jobTitle: 'Prowadzący sesje regresji duchowej',
    description: siteData.author.description,
    knowsAbout: [
      'regresja duchowa',
      'regresja poprzednich wcieleń',
      'regresja między wcieleniami',
      'hipnoza regresyjna',
      'integracja psychologiczno-duchowa'
    ],
    worksFor: {
      '@type': 'Organization',
      name: siteData.instituteLink.label,
      url: siteData.instituteLink.url
    }
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.name,
    url: siteData.domain,
    logo: new URL('/favicon.png', siteData.domain).toString(),
    email: siteData.contact.email,
    telephone: siteData.contact.phone,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: siteData.contact.phone,
      email: siteData.contact.email,
      availableLanguage: 'Polish'
    }
  };
}

export function serviceSchema(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Autorska sesja regresji duchowej Brama Dusz LBL',
    serviceType: 'Sesja rozwojowa i duchowa',
    provider: {
      '@type': 'Person',
      name: siteData.author.name,
      url: new URL('/o-macieju/', siteData.domain).toString()
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska'
    },
    url: new URL(path, siteData.domain).toString(),
    description:
      'Autorska metoda regresji duchowej inspirowana publikacjami dr. Michaela Newtona, prowadzona jako praca rozwojowa i duchowa.',
    offers: {
      '@type': 'Offer',
      url: new URL('/sesja/#kontakt', siteData.domain).toString()
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: new URL('/sesja/#kontakt', siteData.domain).toString(),
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: siteData.contact.phone,
        contactType: 'consultation'
      }
    }
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
    },
    image: new URL(siteData.defaultImage, siteData.domain).toString(),
    mainEntityOfPage: new URL(path, siteData.domain).toString()
  };
}

export function blogPostingSchema(
  path: string,
  headline: string,
  description: string,
  datePublished: string,
  dateModified: string
) {
  const url = new URL(path, siteData.domain).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    url,
    mainEntityOfPage: url,
    inLanguage: siteData.language,
    datePublished,
    dateModified,
    image: new URL(siteData.defaultImage, siteData.domain).toString(),
    author: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.domain
    },
    publisher: {
      '@type': 'Organization',
      name: siteData.name,
      url: siteData.domain,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/favicon.png', siteData.domain).toString()
      }
    }
  };
}
