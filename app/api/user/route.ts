import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { userSchema } from '@/lib/validators';
import { CreateUser } from '@/types';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('user').select();
  const _data = data?.map(d => userSchema.parse(d));
  return NextResponse.json(_data);
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body: CreateUser = await request.json();

    if (!body.email || !body.password || !body.username) {
      return NextResponse.json(
        {
          error: 'Parameter is missed',
        },
        {
          status: 400,
        }
      );
    }

    // check if email or username existed
    const [{ data: existingEmail }, { data: existingUsername }] = await Promise.all([
      supabase.from('user').select('email').eq('email', body.email).single(),
      supabase.from('user').select('username').eq('username', body.username).single(),
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

    // Todo: Salt needs to be produced
    // const { data: newUser, error } = await supabase
    // .from('user')
    // .insert({
    //   email,
    //   password,
    //   name: name || email.split('@')[0],
    //   created_at: new Date().toISOString(),
    //   updated_at: new Date().toISOString(),
    // })
    // .select()
    // .single();

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json(
      { error: '请求格式错误', details: error instanceof Error ? error.message : '未知错误' },
      { status: 400 }
    );
  }
}
