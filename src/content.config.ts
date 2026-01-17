import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const diary = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/diary' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.coerce.date(),
        mood: z.enum(['sunny', 'cloudy', 'rainy', 'stormy', 'rainbow']).default('sunny'),
        cover: image().optional(),
        tags: z.array(z.string()).optional(),
        excerpt: z.string().optional(),
    })
});

export const collections = { diary };
