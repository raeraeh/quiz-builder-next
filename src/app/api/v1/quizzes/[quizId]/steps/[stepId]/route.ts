import { Quiz } from '@components/api/QuizClient';
import { StepService } from '@components/app/services/stepService';

import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { stepId: string } }) {
  try {
    const result = await StepService.getStep(params.stepId);

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
