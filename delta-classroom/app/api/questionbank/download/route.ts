import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('ID,Question\n1,Sample Question');
}
