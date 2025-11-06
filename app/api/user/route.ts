import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { userSchema } from '@/lib/validators';
import { CreateUser, CreateUserInDb, User } from '@/types';
import { hashPassword, generateSalt } from '@/lib/bcrypt';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('user').select();
  const _data = data?.map(d => userSchema.parse(d));
  return NextResponse.json(_data);
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { email, password, username }: CreateUser = await request.json();

    if (!email || !password || !username) {
      return NextResponse.json(
        {
          error: 'Parameter is missed',
        },
        {
          status: 400,
        }
      );
    }

    // check if user has already existed
    const [{ data: existingEmail }, { data: existingUsername }] = await Promise.all([
      supabase.from('user').select('email').eq('email', email).single(),
      supabase.from('user').select('username').eq('username', username).single(),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        {
          error: 'Email has been registered',
        },
        {
          status: 400,
        }
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        {
          error: 'Username has been registered',
        },
        {
          status: 400,
        }
      );
    }

    // create a new user
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const user: CreateUserInDb = {
      email,
      password: hashedPassword,
      username,
      salt,
    };

    const { data: newUser } = await supabase.from('user').insert(user).select().single();

    return NextResponse.json(userSchema.parse(newUser));
  } catch (error) {
    return NextResponse.json(
      { error: 'Unknown error', details: error instanceof Error ? error.message : '未知错误' },
      { status: 400 }
    );
  }
}
