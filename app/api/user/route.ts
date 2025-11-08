import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

import { userSchema } from '@/lib/validators';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = userSchema.parse(data.user);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unknown error', details: error instanceof Error ? error.message : '未知错误' },
      { status: 400 }
    );
  }
}
