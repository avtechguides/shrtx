// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import react from '@astrojs/react'; // <-- import react
import path from 'node:path';

export default defineConfig({
  site: 'https://shrtx.in',
  adapter: cloudflare(),
  integrations: [
    react(),  // <-- now valid
    preact(),
    mdx(),
    sitemap(),
    icon(),
    tailwind({ configFile: './tailwind.config.mjs' }),
  ],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@content': path.resolve('./src/content'),
        '@styles': path.resolve('./src/styles'),
        '@lib': path.resolve('./src/lib'),
        '@data': path.resolve('./src/data'),
        '@config': path.resolve('./src/config'),
        '@assets': path.resolve('./src/assets'),
      },
    },
    server: {
      allowedHosts: ['shrtx.in', 'dev.avtechguides.com', 'dev.shrtx.in'],
    },
  },
});
