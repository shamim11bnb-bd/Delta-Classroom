import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Exam Question Bank API is working successfully',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({
      status: 'success',
      received: data
    });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON payload' }, { status: 400 });
  }
}
