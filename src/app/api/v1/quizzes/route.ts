import { NextResponse } from 'next/server';
import { db } from '../../../../../db';
import { quizzes, steps } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import { Quiz } from '../../../../api/QuizClient';
import { Step } from '../../../../api/StepClient';
import { createQuizHandler, getQuizzesHandler, objectToArray } from '@components/app/services/quizService';

export async function GET(request: Request) {
  try {
    const result = await getQuizzesHandler();
    const resultArray = objectToArray(result);
    return new NextResponse(JSON.stringify(resultArray));
  } catch (error) {
    console.error('Error retrieving quizzes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request, response: Response) {
  try {
    // Log the request information to the server console
    console.log('Received POST request:', request);

    // Parse the request body as JSON
    const requestData = await request.json();

    // Add a new quiz to the database
    const newQuiz = await createQuizHandler(requestData.name);

    // Log the newly created quiz
    console.log('Created quiz:', newQuiz);

    return new NextResponse(JSON.stringify(newQuiz), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
