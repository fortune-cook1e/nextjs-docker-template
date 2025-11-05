import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().or(z.number()),
  username: z.string().min(1),
  email: z.email(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createUserSchema = userSchema
  .pick({
    username: true,
    email: true,
  })
  .extend({
    password: z.string().min(6),
  });

export const loginSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(6),
  });
