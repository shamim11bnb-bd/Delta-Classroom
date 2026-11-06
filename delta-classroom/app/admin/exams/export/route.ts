import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('Student,Exam,Score\nJohn,Math,90', {
    headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename=results.csv' }
  });
}
