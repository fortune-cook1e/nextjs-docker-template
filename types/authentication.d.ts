import { loginSchema, registerSchema } from '@/lib/validators';
import { User } from '@/types/user';
import z from 'zod';

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;

export interface AuthenticationResponse {
  data?: User;
  message?: string;
  error?: string;
}
