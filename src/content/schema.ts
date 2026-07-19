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
      'Praktyczny przewodnik po regresji LBL i Life Between Lives oraz informacje o sesjach prowadzonych przez Instytut Regresji.'
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteData.author.name,
    url: new URL('/o-macieju/', siteData.domain).toString(),
    jobTitle: 'Prowadzący sesje regresji LBL i regresji duchowej',
    description: siteData.author.description,
    knowsAbout: [
      'regresja duchowa',
      'regresja poprzednich wcieleń',
      'regresja między wcieleniami',
      'Life Between Lives',
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
    name: siteData.instituteLink.label,
    url: siteData.instituteLink.url,
    email: siteData.contact.email,
    telephone: siteData.contact.phone,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'reservations',
      telephone: siteData.contact.phone,
      email: siteData.contact.email,
      availableLanguage: 'Polish'
    },
    sameAs: [siteData.instituteLink.lblUrl]
  };
}

export function serviceSchema(path = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Regresja między wcieleniami LBL',
    serviceType: 'Regresja Life Between Lives',
    provider: {
      '@type': 'Organization',
      name: siteData.instituteLink.label,
      url: siteData.instituteLink.lblUrl,
      telephone: siteData.contact.phone,
      email: siteData.contact.email
    },
    areaServed: {
      '@type': 'Country',
      name: 'Polska'
    },
    url: new URL(path, siteData.domain).toString(),
    description:
      'Pogłębiona sesja regresji LBL poświęcona doświadczeniu życia między wcieleniami, obejmująca przygotowanie, prowadzenie i integrację. Dostępna online oraz stacjonarnie w Rzeszowie.',
    offers: {
      '@type': 'Offer',
      url: new URL('/sesja/#kontakt', siteData.domain).toString(),
      priceCurrency: 'PLN',
      price: '1110',
      availability: 'https://schema.org/InStock'
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

export function bramaServiceSchema(path = '/brama-dusz-lbl/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Brama Dusz LBL',
    serviceType: 'Autorska sesja regresji duchowej',
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
      'Autorski format regresji duchowej rozwijany przez Macieja Masłankę, inspirowany publikacjami dr. Michaela Newtona i własną praktyką prowadzenia sesji.',
    offers: {
      '@type': 'Offer',
      url: new URL('/sesja/#kontakt', siteData.domain).toString()
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
