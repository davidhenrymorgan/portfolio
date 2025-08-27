import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    featured: z.boolean().default(false),
    
    // Project details
    status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
    
    // Technology stack
    technologies: z.array(z.string()),
    category: z.enum(['web', 'mobile', 'backend', 'fullstack', 'design']),
    
    // Links
    demoUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    
    // Images - make them all optional for now
    heroImage: z.string().optional(),
    thumbnailImage: z.string().optional(),
    
    // SEO and metadata
    tags: z.array(z.string()).default([]),
    excerpt: z.string().max(160).optional(),
  })
});

export const collections = {
  'projects': projectsCollection,
};