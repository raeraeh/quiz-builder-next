import { NextResponse } from 'next/server';
import { db } from 'db';
import { quizzes, steps } from 'db/schema';
import { eq } from 'drizzle-orm';
import { QuizService } from '@components/app/services/quizService';
import { StepService } from '@components/app/services/stepService';

export type NewStep = typeof steps.$inferInsert;

export async function POST(request: Request, { params }: { params: { quizId: string } }) {
  try {
    const quizId = params.quizId;

    const existingQuiz = await QuizService.getQuiz(quizId);

    if (!existingQuiz) {
      return new NextResponse('Not found', { status: 404 });
    }

    const stepData: NewStep = await request.json();

    const newStep = StepService.createStep(stepData);

    return new NextResponse(JSON.stringify(newStep), {
      status: 201, // 201 Created status code for successful creation
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
