// src/config/consts.ts

// --------------------
// Global Site Metadata
// --------------------
export const SITE_TITLE = 'SHRTX – Fast, Simple & Secure URL Shortener';
export const SITE_DESCRIPTION =
  'SHRTX is a lightweight, privacy-friendly URL shortener built by Vishu. Fast redirects, custom domains, and no ads.';
export const SITE_URL = 'https://shrtx.in'; // trailing slash policy is handled where URLs are generated

// Optional brand constants used across SEO/helpers
export const BRAND = {
  name: 'SHRTX',
  logoPath: '/favicon.svg' // kept relative; resolve to absolute with SITE_URL where needed
};

// --------------------
// Author Metadata
// --------------------
export const AUTHOR = {
  name: 'Vishu Tiwari',
  title: 'Systems Admin & Indie Web Builder',
  url: 'https://shrtx.in',
  github: 'https://github.com/avtechguides',
  x: 'https://x.com/shrtx'
};

// --------------------
// Social Metadata
// --------------------
export const SOCIAL = {
  twitterHandle: '@shrtx_in',            // used by Twitter cards
  xUrl: 'https://x.com/shrtx',
  github: AUTHOR.github,
  email: 'info@avtechguides.com',
  // Used to enrich Organization/WebSite sameAs in JSON-LD
  sameAs: [
    'https://x.com/shrtx',
    'https://github.com/avtechguides',
    // Add when available:
    // 'https://www.linkedin.com/in/<handle>/',
    // 'https://www.youtube.com/@<channel>',
    // 'https://www.instagram.com/<handle>/'
  ],
  // Optional additional brands owned/operated (for future entity linking)
  related: [
    'https://avtechguides.com'
  ]
};

// --------------------
// SEO / Open Graph Defaults
// --------------------
export const OG = {
  locale: 'en_US',
  defaultImage: '/assets/images/blog-placeholder-1.jpg' // resolved to absolute with SITE_URL where needed
};
