import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Login } from '@/types';
import { userSchema } from '@/lib/validators';

// 1: https://the-shubham.medium.com/next-js-supabase-cookie-based-auth-workflow-the-best-auth-solution-2025-guide-f6738b4673c1
// 2: https://supabase.com/docs/reference/javascript/auth-signinwithpassword
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { email, password }: Login = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error, details: error instanceof Error ? error.message : '未知错误' },
        { status: 400 }
      );
    }

    const _user = userSchema.parse(data.user);

    return NextResponse.json({ data: _user, message: 'Login success' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unknown error', details: error instanceof Error ? error.message : '未知错误' },
      { status: 400 }
    );
  }
}
