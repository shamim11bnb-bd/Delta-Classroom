import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const filters = await request.json();
  return NextResponse.json({ filtered: [], filters });
}
