import { createUserInDbSchema, createUserSchema, userSchema } from '@/lib/validators';
import { z } from 'zod';

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type CreateUserInDb = z.infer<typeof createUserInDbSchema>;
