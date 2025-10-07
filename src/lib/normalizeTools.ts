// src/lib/normalizeTools.ts

import type { Tool } from '@/data/tools/tools';
import { slugifyTag } from './slug';

// Map category names to default icons
const defaultIcons: Record<string, string> = {
  'url & link tools': '🔗',
  'image tools': '🖼️',
  'pdf & document tools': '📄',
  'privacy & security tools': '🛡️',
  'seo & marketing tools': '📈',
  'social media & productivity tools': '💬',
  'text & content tools': '✍️',
  'code & developer tools': '💻',
  'conversion tools': '🔁',
  'fun & viral tools': '🎉',
};

// Raw frontmatter interface (all fields optional except slug/title)
interface RawToolFrontmatter {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  authorSlug?: string;
  createdAt?: string;
  updatedAt?: string;
  isPremium?: boolean;
  features?: string[];
  popularity?: number;
  icon?: string;
  href?: string;
}

/**
 * Normalizes a single raw frontmatter tool to the full Tool interface.
 *
 * @param raw - raw frontmatter object
 * @returns normalized Tool object
 */
export function normalizeTool(raw: RawToolFrontmatter): Tool {
  const category: string = raw.category ?? 'Uncategorized';
  const categorySlug: string = slugifyTag(category);

  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description ?? '',
    category,
    categorySlug,
    icon: raw.icon ?? defaultIcons[category.toLowerCase()] ?? '🧩',
    authorSlug: raw.authorSlug,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    isPremium: raw.isPremium,
    features: raw.features ?? [],
    popularity: raw.popularity ?? 0,
    href: raw.href ?? `/tools/${raw.slug}`,
  };
}

/**
 * Normalizes an array of raw tool frontmatter objects.
 *
 * @param rawTools - array of raw frontmatter objects
 * @returns array of fully typed Tool objects
 */
export function normalizeTools(rawTools: RawToolFrontmatter[]): Tool[] {
  return rawTools.map((raw: RawToolFrontmatter) => normalizeTool(raw));
}
