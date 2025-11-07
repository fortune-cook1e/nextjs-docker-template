import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { Register } from '@/types';
import { userSchema } from '@/lib/validators';

// refer to: https://supabase.com/docs/reference/kotlin/auth-signup
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { email, password, username }: Register = await request.json();

    const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();

    if (checkError) {
      return NextResponse.json({ error: checkError, data: null }, { status: 400 });
    } else {
      const emailExists = existingUsers?.users?.some(
        user => user.email === email && user.email_confirmed_at !== null
      );

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email has been registered', data: null },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    const _user = userSchema.parse(data.user);

    if (error) {
      return NextResponse.json({ error: error.message, data: null }, { status: 400 });
    }

    return NextResponse.json({ data: _user, message: '注册成功' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unknown error', details: error instanceof Error ? error.message : '未知错误' },
      { status: 400 }
    );
  }
}
