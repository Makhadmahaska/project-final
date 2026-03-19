import { z } from 'zod';

export const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email(),
  category: z.string().min(1, 'Category is required'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  message: z.string().min(1, 'Message is required'),
  notify: z.boolean(),
});