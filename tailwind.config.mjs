import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
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
      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans], // Variable font for smooth text
      },
      fontSize: {
        base: ['clamp(1rem, 1vw + 0.25rem, 1.125rem)', { lineHeight: '1.75' }],
        lg: ['clamp(1.125rem, 1.5vw + 0.25rem, 1.25rem)', { lineHeight: '1.75' }],
        xl: ['clamp(1.25rem, 2vw + 0.5rem, 1.5rem)', { lineHeight: '1.75' }],
        '2xl': ['clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)', { lineHeight: '1.5' }],
        '3xl': ['clamp(1.875rem, 3vw + 0.5rem, 2.25rem)', { lineHeight: '1.3' }],
        '4xl': ['clamp(2.25rem, 3.5vw + 0.5rem, 3rem)', { lineHeight: '1.2' }],
      },
      boxShadow: {
        md: '0 4px 6px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.05)',
        lg: '0 8px 15px rgba(0,0,0,0.15), 0 20px 30px rgba(0,0,0,0.1)',
        xl: '0 12px 25px rgba(0,0,0,0.2), 0 24px 45px rgba(0,0,0,0.15)',
        '2xl': '0 25px 50px rgba(0,0,0,0.25), 0 35px 60px rgba(0,0,0,0.2)',
      },
      colors: {
        blue: {
          500: '#3B82F6', // brand primary blue
          600: '#2563EB',
          700: '#1E40AF',
          800: '#1B3A91',
        },
        red: {
          500: '#EC2F36', // brand red
          600: '#C02126',
        },
        primary: 'var(--accent)',
        secondary: '#111827',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        sharp: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        DEFAULT: '300ms',
        fast: '150ms',
      },
    },
  },
  plugins: [forms],
};
