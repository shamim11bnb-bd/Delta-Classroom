import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const paper = await request.json();
  return NextResponse.json({ success: true, paperId: 'paper-123' });
}
