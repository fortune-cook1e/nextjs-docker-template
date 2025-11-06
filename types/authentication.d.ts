import { loginSchema, registerSchema } from '@/lib/validators';
import z from 'zod';

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
