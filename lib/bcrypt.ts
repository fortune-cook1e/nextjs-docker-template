'server only';

import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string, salt: string): Promise<string> {
  return bcrypt.hash(password, salt);
}

export function generateSalt(rounds: number = 10): Promise<string> {
  return bcrypt.genSalt(rounds);
}

export function compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function checkPassword(plainPassword: string, hashedPassword: string) {
  const isValid = await compare(plainPassword, hashedPassword);
  if (!isValid) {
    throw new Error('Password is not valid');
  }
}
