import { db } from "db";
import { quizzes } from "db/schema";
import { New_Rocker } from "next/font/google";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function GET(request: Request,  { params }: { params: { id: string } }) {
  const id = await params.id
 
  return new NextResponse(JSON.stringify(id))
}


export async function DELETE(request: Request, { params }: { params: { id: string }}, response: Response) {

  try {
   // Extract quiz ID from the request parameters or body
   const id = params.id
   console.log('Received ID:', id);

    // const { id } = request.body;

    // Check if the ID is provided
    if (!id) {
      return new NextResponse("Bad Request: Quiz ID is required", { status: 400 });
    }

    // Delete quiz from the database
    const deleteResult = await db.delete(quizzes).where(eq(quizzes.id, id));

    // Return a success response
    return new NextResponse(`Quiz with ID ${id} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    // Return an error response
    return new NextResponse("Internal Server Error", { status: 500 });

  }
}
