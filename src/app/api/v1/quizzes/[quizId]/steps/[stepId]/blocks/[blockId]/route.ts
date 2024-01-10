import { BlockService } from '@components/app/services/blockService';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { blockId: string } }) {
  try {
    const result = await BlockService.getBlock(params.blockId);

    return new NextResponse(JSON.stringify(result));
  } catch (error) {
    console.error('Error retrieving quizzes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
