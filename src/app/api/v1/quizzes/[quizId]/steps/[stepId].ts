import { Quiz } from '@components/api/QuizClient';
import { db } from 'db';
import { quizzes, steps } from 'db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = await params.id;
  console.log('request', request);
  return new NextResponse(JSON.stringify(id));
}
