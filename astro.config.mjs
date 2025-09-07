// @ts-check
import { defineConfig } from 'astro/config';

// Integrations
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://shrtx.in',

  integrations: [
    mdx(),
    sitemap(),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['shrtx.in'],
    },
  },

  // Tailwind config inline
  tailwind: {
    config: {
      darkMode: "class", // ✅ this is the missing piece
      content: ['./src/**/*.{astro,js,ts,jsx,tsx,mdx}'],
      theme: {
        extend: {
          keyframes: {
            fadeUp: {
              '0%': { opacity: '0', transform: 'translateY(20px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
            },
          },
          animation: {
            'fade-up': 'fadeUp 1s ease-out forwards',
          },
        },
      },
      plugins: [],
    },
  },
});
