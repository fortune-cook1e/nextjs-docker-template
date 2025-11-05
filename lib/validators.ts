import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  email: z.email(),
  created_at: z.string(),
  updated_at: z.string(),
});
