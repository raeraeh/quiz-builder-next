import { BlockService } from '@components/app/services/blockService';
import { NextRequest, NextResponse } from 'next/server';
import { NewBlock } from '../route';

export async function GET(request: NextRequest, { params }: { params: { blockId: string } }) {
  try {
    const result = await BlockService.getBlock(params.blockId);

    return new NextResponse(JSON.stringify(result));
  } catch (error) {
    console.error('Error retrieving quizzes:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { blockId: string } }) {
  try {
    const blockData: NewBlock = await request.json();
    console.log('request', blockData);

    const result = BlockService.updateBlock(blockData, params.blockId);

    return new NextResponse(JSON.stringify(result), {
      status: 201, // 201 Created status code for successful creation
    });
  } catch (error) {
    console.error('Error updating block:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { blockId: string } }) {
  try {
    const blockId = params.blockId;

    if (!blockId) {
      return new NextResponse('Bad Request: block ID is required', { status: 400 });
    }

    await BlockService.deleteBlock(blockId);
    return new NextResponse(`step with ID ${blockId} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error('Error deleting block', error);
    // Return an error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
