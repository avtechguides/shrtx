// src/config/seo.config.ts
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, OG, AUTHOR, SOCIAL } from './consts';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  path?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

// --- Helpers ---
function safeIso(d?: string | Date): string {
  try {
    return d ? new Date(d).toISOString() : new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function resolveImage(img?: string): string {
  return img
    ? new URL(img, SITE_URL).toString()
    : new URL(OG.defaultImage, SITE_URL).toString();
}

/**
 * Generic SEO generator
 */
export function generateSEO({
  title,
  description,
  image,
  imageAlt,
  path = '/'
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const metaDescription = description ?? SITE_DESCRIPTION;
  const canonicalUrl = new URL(path, SITE_URL).toString();
  const ogImage = resolveImage(image);

  return {
    title: fullTitle,
    description: metaDescription,
    image: ogImage,
    imageAlt: imageAlt ?? metaDescription,
    canonicalUrl
  };
}

/**
 * Generate breadcrumb schema-friendly array
 */
export function generateBreadcrumb(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [
    { name: 'Home', url: SITE_URL },
    ...items.map((item) => ({
      name: item.name,
      url: new URL(item.url, SITE_URL).toString()
    }))
  ];
}

/**
 * SEO helper for Blog Posts (with BlogPosting schema)
 */
export function generateBlogPostSEO({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const path = `/blog/${slug}`;
  const seo = generateSEO({ title, description, image, path });

  return {
    ...seo,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url: seo.canonicalUrl,
      image: seo.image ? [seo.image] : [],
      datePublished: safeIso(datePublished),
      dateModified: safeIso(dateModified ?? datePublished),
      author: { '@type': 'Person', name: AUTHOR.name },
      mainEntityOfPage: { '@type': 'WebPage', '@id': seo.canonicalUrl }
    }
  };
}

/**
 * SEO helper for Tools / SoftwareApplication or WebApplication pages
 */
export function generateToolSEO({
  title,
  description,
  path = '/',
  image,
  datePublished,
  dateModified,
  type = 'SoftwareApplication'
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  type?: 'SoftwareApplication' | 'WebApplication';
}) {
  const seo = generateSEO({ title, description, image, path });

  return {
    ...seo,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': type,
      name: title,
      url: seo.canonicalUrl,
      description,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Any',
      creator: {
        '@type': 'Person',
        name: AUTHOR.name,
        url: `${SITE_URL}/about`
      },
      image: seo.image,
      datePublished: safeIso(datePublished),
      dateModified: safeIso(dateModified ?? datePublished)
    }
  };
}

/**
 * CollectionPage SEO (for listings & pagination like /blog/ and /blog/page/2/)
 */
export function generateCollectionSEO({
  title,
  description,
  path,
  currentPage = 1,
  totalPages
}: {
  title: string;
  description: string;
  path: string;            // base listing path, e.g. '/blog/'
  currentPage?: number;
  totalPages: number;
}) {
  const seo = generateSEO({ title, description, path });

  const prevUrl =
    currentPage > 1
      ? new URL(`${path}page/${currentPage - 1}/`, SITE_URL).toString()
      : null;
  const nextUrl =
    currentPage < totalPages
      ? new URL(`${path}page/${currentPage + 1}/`, SITE_URL).toString()
      : null;

  return {
    ...seo,
    prevUrl,
    nextUrl,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: seo.canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_TITLE,
        url: SITE_URL
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: title, item: seo.canonicalUrl }
        ]
      }
    }
  };
}

/**
 * Optional: Organization + WebSite (+ SearchAction) JSON-LD for homepage/site shell
 * Use exactly once (e.g., on the homepage) to avoid duplication sitewide.
 */
export function generateSiteEntityJSONLD() {
  const org: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_TITLE,
    url: SITE_URL,
    logo: new URL('/favicon.svg', SITE_URL).toString()
  };
  if (Array.isArray((SOCIAL as any).sameAs) && (SOCIAL as any).sameAs.length) {
    org.sameAs = (SOCIAL as any).sameAs;
  }

  const website: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: SITE_URL
  };

  // Include SearchAction if your site exposes a search endpoint or action.
  // Adjust target and query-input to your actual search implementation.
  website.potentialAction = [
    {
      '@type': 'SearchAction',
      target: `${SITE_URL}/app?url={url}`,
      'query-input': 'required name=url'
    }
  ];

  return [org, website];
}
