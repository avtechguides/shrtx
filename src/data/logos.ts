// Build a list of available SVG logos from src/assets/logos
// Using Vite's import.meta.glob to keep imports clean and centralized

const modules = import.meta.glob('../assets/logos/*.svg', {
  eager: true,
  // Vite v5 style: returns string URLs
  query: '?url',
  import: 'default',
});

export type LogoItem = {
  name: string;
  logo: string;
  href?: string;
  forceLight?: boolean; // if true, skip dark-mode filters in the carousel
};

function toNiceName(filePath: string): string {
  const base = filePath.split('/').pop() || '';
  const withoutExt = base.replace(/\.[^.]+$/, '');
  const withoutLogo = withoutExt.replace(/-?logo$/i, '');
  const normalized = withoutLogo.replace(/[_-]+/g, ' ');
  const spaced = normalized.replace(/([a-z])([A-Z])/g, '$1 $2');
  const trimmed = spaced.trim().replace(/\s{2,}/g, ' ');
  return trimmed.replace(/\b\w/g, (m) => m.toUpperCase());
}

// Optional per-logo overrides by name (case-sensitive after toNiceName)
const overrides: Partial<Record<string, Partial<LogoItem>>> = {
  // Example entries:
  // 'Brandx': { forceLight: true, href: 'https://brandx.example' },
  // 'Google Ads': { forceLight: true },
};

export const logos: LogoItem[] = Object.entries(modules)
  .map(([path, url]) => {
    const name = toNiceName(path);
    const base: LogoItem = { name, logo: url as string };
    return Object.assign(base, overrides[name] ?? {});
  })
  .sort((a, b) => a.name.localeCompare(b.name));
