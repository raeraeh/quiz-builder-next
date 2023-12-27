import { Quiz } from '@components/api/QuizClient';
import { db } from 'db';
import { quizzes, steps } from 'db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { stepId: string } }) {
  const stepResult = await db.select().from(steps).where(eq(steps.id, params.stepId));

  return new NextResponse(JSON.stringify(stepResult[0]));
}

export async function DELETE(request: Request, { params }: { params: { stepId: string } }) {
  try {
    const id = params.stepId;

    console.log('payload in server');

    if (!id) {
      return new NextResponse('Bad Request: step ID is required', { status: 400 });
    }

    await db.delete(steps).where(eq(steps.id, params.stepId));

    return new NextResponse(`step with ID ${id} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting step', error);
    // Return an error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
