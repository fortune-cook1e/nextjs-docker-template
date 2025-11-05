import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { userSchema } from '@/lib/validators';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from('user').select();
  const _data = data?.map(d => userSchema.parse(d));
  return NextResponse.json(_data);
}
