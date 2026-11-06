import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('Question,OptionA,OptionB\nWhat is 2+2?,3,4', {
    headers: { 'Content-Type': 'text/csv' }
  });
}
