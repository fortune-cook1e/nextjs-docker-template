import { User } from '@/types';
import { NextResponse } from 'next/server';

export async function GET() {
  const users: User[] = [
    { id: 1, name: '张三', age: 28 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 24 },
  ];
  return NextResponse.json(users);
}
