import { db } from 'db';
import { quizzes } from 'db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { QuizService } from '@components/app/services/quizService';

export async function GET(request: Request, { params }: { params: { quizId: string } }) {
  const quizId = params.quizId;

  const selectedQuiz = await QuizService.getQuiz(quizId);
  console.log('route quiz');
  return new NextResponse(JSON.stringify(selectedQuiz));
}

export async function DELETE(request: Request, { params }: { params: { quizId: string } }, response: Response) {
  try {
    const quizId = params.quizId;

    if (!quizId) {
      return new NextResponse('Bad Request: Quiz ID is required', { status: 400 });
    }

    QuizService.deleteQuiz(quizId);

    return new NextResponse(`Quiz with ID ${quizId} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export type NewQuiz = typeof quizzes.$inferInsert;

export async function PUT(request: Request, { params }: { params: { quizId: string } }, response: Response) {
  try {
    const quizId = params.quizId;

    // Parse the request body as JSON
    const requestData: NewQuiz = await request.json();
    if (!quizId) {
      return new NextResponse('Bad Request: Quiz ID is required', { status: 400 });
    }

    const result = await QuizService.updateQuiz(requestData, quizId);

    return new NextResponse(JSON.stringify(result));
  } catch (error) {
    console.error('Error updating quiz:', error);
    // Return an error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
