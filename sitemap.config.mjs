// sitemap.config.mjs
import { getCollection } from 'astro:content';

/**
 * Custom sitemap generator for shrtx.in
 * - Includes all projects, tools, blog posts, and main pages
 * - Excludes admin, login, register, and app pages
 * - Sets priorities and last modified dates
 */

export async function getSitePages() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/projects', priority: 0.9, changefreq: 'weekly' },
    { url: '/tools', priority: 0.9, changefreq: 'weekly' },
  ];

  // Dynamically add project pages
  const projects = await getCollection('projects'); // If you have a projects collection
  projects.forEach((project) => {
    pages.push({
      url: `/projects/${project.slug}/`,
      priority: 0.9,
      changefreq: 'monthly',
      lastmod: project.data.updatedDate?.toISOString() ?? new Date().toISOString(),
    });
  });

  // Dynamically include all blog posts
  const blogPosts = await getCollection('blog');
  blogPosts.forEach((post) => {
    pages.push({
      url: `/blog/${post.slug}/`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: post.data.pubDate.toISOString(),
    });
  });

  // Dynamically include all tools
  const tools = await getCollection('tools');
  tools.forEach((tool) => {
    pages.push({
      url: `/tools/${tool.slug}/`,
      priority: 0.8,
      changefreq: 'monthly',
      lastmod: tool.data.updatedDate?.toISOString() ?? new Date().toISOString(),
    });
  });

  return pages;
}

// Optional: filter URLs you want to exclude
export function filterSitemapUrls(url) {
  const disallowed = ['/app', '/admin', '/login', '/register'];
  return !disallowed.some((d) => url.startsWith(d));
}