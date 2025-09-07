// src/data/toolHighlights.ts

export type ToolHighlight = {
  title: string;
  description: string;
  icon: string; // emoji or short label; components decide how to render it (emoji, SVG, etc.)
};

export const toolHighlights: ToolHighlight[] = [
  {
    title: 'Easy & Fast',
    description: 'Enter a long URL and get a shortened link instantly.',
    icon: '⚡'
  },
  {
    title: 'Shortened Links Everywhere',
    description: 'Optimized links for sharing across platforms.',
    icon: '📈'
  },
  {
    title: 'Secure & Reliable',
    description: 'HTTPS and automated abuse filtering for safe links.',
    icon: '🔒'
  },
  {
    title: 'Analytics & Tracking',
    description: 'Monitor clicks and engagement in real time.',
    icon: '📊'
  },
  {
    title: 'QR Code Generator',
    description: 'Create QR codes instantly for any link.',
    icon: '✨'
  },
  {
    title: 'Device Compatible',
    description: 'Works across phones, tablets, and desktops.',
    icon: '📱'
  }
];
