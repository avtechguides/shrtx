// src/data/features.ts

export const features = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    title: 'Fast URL Shortening',
    description: 'Shorten any link instantly with SHRTX and share it across your favorite platforms.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8M8 8l8 8"/></svg>`,
    title: 'QR Code Generator',
    description: 'Automatically generate QR codes for all your short links for easy offline sharing.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/></svg>`,
    title: 'Analytics & Tracking',
    description: 'Track clicks, user behavior, and engagement in real-time with our analytics dashboard.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="12" rx="2"/></svg>`,
    title: 'Custom Domains',
    description: 'Use your own domains or branded links to maintain consistent branding across all URLs.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
    title: 'API Integration',
    description: 'Integrate SHRTX into your own applications and workflows with a simple REST API.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><line x1="12" y1="5" x2="12" y2="19"/></svg>`,
    title: 'Secure & Reliable',
    description: 'All links are served over HTTPS with built-in security and uptime monitoring.'
  }
] as const;

export type Feature = (typeof features)[number];
