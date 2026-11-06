import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'active', server: 'Delta Classroom API' });
}
