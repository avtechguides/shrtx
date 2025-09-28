// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://shrtx.in',

  adapter: cloudflare(),

  integrations: [
    mdx(),
    sitemap(),
    icon(),
    tailwind({
      configFile: './tailwind.config.mjs', // points to your Tailwind config
    }),
  ],

  vite: {
    server: {
      allowedHosts: ['shrtx.in'],
    },
  },
});

