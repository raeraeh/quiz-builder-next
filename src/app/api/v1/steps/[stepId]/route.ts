import { Quiz } from '@components/api/QuizClient';
import { StepService } from '@components/app/services/stepService';

import { NextResponse } from 'next/server';

import { objectToArray } from '@components/app/utils/objectToArray';
import { NewStep } from '../../quizzes/[quizId]/steps/route';

export async function GET(request: Request, { params }: { params: { stepId: string } }) {
  try {
    const result = await StepService.getStep(params.stepId);
    // const resultArray = objectToArray(result);
    // console.log('step get api result', resultArray);
    return new NextResponse(JSON.stringify(result));
  } catch (error) {
    console.error('Error retrieving step:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { stepId: string } }) {
  try {
    const stepId = params.stepId;

    console.log('payload in server');

    if (!stepId) {
      return new NextResponse('Bad Request: step ID is required', { status: 400 });
    }

    await StepService.deleteStep(stepId);
    return new NextResponse(`step with ID ${stepId} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting step', error);
    // Return an error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { stepId: string } }) {
  try {
    const stepData: NewStep = await request.json();
    console.log('request', stepData);

    const result = StepService.updateStep(stepData, params.stepId);

    return new NextResponse(JSON.stringify(result), {
      status: 201, // 201 Created status code for successful creation
    });
  } catch (error) {
    console.error('Error updating step:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
