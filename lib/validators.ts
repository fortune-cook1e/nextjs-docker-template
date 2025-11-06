import { z } from 'zod';

export const UseMetadataSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  email_verified: z.boolean().default(false),
  phone_verified: z.boolean().default(false),
  sub: z.string(),
  username: z.string().trim(),
});

export const userSchema = z.object({
  id: z.string(),
  role: z.enum(['authenticated']),
  phone: z.string(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  created_at: z.string(),
  updated_at: z.string(),
  user_metadata: UseMetadataSchema,
});

export const loginSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    password: z.string().min(6, { error: 'Password must be at least 6 characters long.' }).trim(),
  });

export const registerSchema = userSchema
  .pick({
    email: true,
  })
  .extend({
    username: z.string().min(6, { error: 'Username must be at least 6 characters long.' }),
    password: z.string().min(6, { error: 'Password must be at least 6 characters long.' }).trim(),
  });
