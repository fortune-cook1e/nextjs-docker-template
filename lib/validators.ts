import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(2, { error: 'Username must be at least 2 characters long.' }).trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createUserSchema = userSchema
  .pick({
    username: true,
    email: true,
  })
  .extend({
    password: z.string().min(6, { error: 'Password must be at least 6 characters long.' }).trim(),
  });

export const createUserInDbSchema = createUserSchema.extend({
  salt: z.string(),
});

export const loginSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(6, { error: 'Password must be at least 6 characters long.' }).trim(),
  });
