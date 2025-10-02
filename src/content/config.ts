import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // Required
      title: z.string().min(1, 'Title is required'),
      // Optional description or summary
      description: z.string().max(300).optional(),
      // Dates
      updatedDate: z.coerce.date().optional(),
      // Visuals
      heroImage: image().optional(),
      // Draft status
      draft: z.boolean().default(false).optional(),
      // You can add more fields specific to projects here
    }),
});

// Keep existing blog and tools collections
const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, 'Title is required'),
      pubDate: z.coerce.date().default(() => new Date()),
      updatedDate: z.coerce.date().optional(),
      description: z.string().max(300).optional(),
      author: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]).optional(),
      heroImage: image().optional(),
      canonical: z.string().url().optional(),
      draft: z.boolean().default(false).optional(),
    }),
});

const tools = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().max(300).optional(),
      order: z.number().int().min(0).optional(),
      icon: z.string().optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false).optional(),
    }),
});

export const collections = { blog, tools, projects };
