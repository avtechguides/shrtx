// src/data/tools/tools.ts

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  icon: string;
  authorSlug?: string;
  createdAt?: string;
  updatedAt?: string;
  isPremium?: boolean;
  features?: string[];
  popularity?: number;

  // Add this:
  href?: string;  // URL to open tool page
}


// Import category-specific tool arrays
import { urlTools } from "./categories/url-tools";
import { textTools } from "./categories/text-tools";
import { imageTools } from "./categories/image-tools";
import { pdfTools } from "./categories/pdf-tools";
import { developerTools } from "./categories/developer-tools";
import { seoTools } from "./categories/seo-tools";
import { securityTools } from "./categories/security-tools";
import { conversionTools } from "./categories/conversion-tools";
import { funTools } from "./categories/fun-tools";
import { socialTools } from "./categories/social-tools";

// Combine all tools into a single array
export const tools: Tool[] = [
  ...urlTools,
  ...textTools,
  ...imageTools,
  ...pdfTools,
  ...developerTools,
  ...seoTools,
  ...securityTools,
  ...conversionTools,
  ...funTools,
  ...socialTools,
];

// Optional: Utility functions

/**
 * Get tools by category slug
 */
export function getToolsByCategorySlug(slug: string): Tool[] {
  return tools.filter(tool => tool.categorySlug === slug);
}

/**
 * Get top N popular tools globally or per category
 */
export function getTopTools(count = 5, categorySlug?: string): Tool[] {
  let filtered = categorySlug ? getToolsByCategorySlug(categorySlug) : [...tools];
  return filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, count);
}
