// src/content/config.ts
import { defineCollection, z } from "astro:content";

// If using Astro v4/v5, prefer the schema callback to access helpers like image()
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().min(1, "Title is required"),
      // Dates
      pubDate: z.coerce.date().default(() => new Date()),
      updatedDate: z.coerce.date().optional(),
      // SEO/summary
      description: z.string().max(300).optional(),
      // Author and taxonomy
      author: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]).optional(),
      // Visuals: ImageMetadata when provided
      heroImage: image().optional(),
      // Optional canonical override
      canonical: z.string().url().optional(),
      // Draft
      draft: z.boolean().default(false).optional(),
    }),
});

const tools = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().min(1),
      // Optional summary/SEO
      description: z.string().max(300).optional(),
      // Routing/ordering hints (do NOT include slug in schema; Astro reserves it)
      order: z.number().int().min(0).optional(),
      // Visuals
      icon: z.string().optional(),
      heroImage: image().optional(),
      // Draft
      draft: z.boolean().default(false).optional(),
    }),
});

export const collections = { blog, tools };
