import { NextResponse } from 'next/server';
import { db } from 'db';
import { quizzes, steps, blocks } from 'db/schema';
import { eq } from 'drizzle-orm';
import { QuizService } from '@components/app/services/quizService';
import { StepService } from '@components/app/services/stepService';
import { BlockService } from '@components/app/services/blockService';

export type NewBlock = typeof blocks.$inferInsert;

export async function POST(request: Request, { params }: { params: { stepId: string } }) {
  try {
    const existingStep = await StepService.getStep(params.stepId);

    if (!existingStep) {
      return new NextResponse('Not found', { status: 404 });
    }

    const blockData: NewBlock = await request.json();
    console.log('request', blockData);

    const newBlock = BlockService.createBlock(blockData);

    return new NextResponse(JSON.stringify(newBlock), {
      status: 201, // 201 Created status code for successful creation
    });
  } catch (error) {
    console.error('Error creating block:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
