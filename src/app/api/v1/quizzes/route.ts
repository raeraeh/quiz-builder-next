import { NextResponse } from 'next/server';
import { QuizService } from '@components/app/services/quizService';
import { objectToArray } from '@components/app/utils/objectToArray';
import { Quiz } from '@components/api/QuizClient';

type QuizWithoutSteps = Omit<Quiz, 'steps'>;
export async function GET(request: Request) {
  try {
    const result = await QuizService.getQuizzes();

    // const resultArray: QuizWithoutSteps[] = (objectToArray(result) as Quiz[]).map(({ id, name }) => ({ id, name }));
    const resultArray = objectToArray(result);

    // console.log('result', newArray);
    console.log('quiz result', resultArray);
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
    const newQuiz = await QuizService.createQuiz(requestData.name);

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
