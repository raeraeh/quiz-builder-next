import { db } from "db";
import { quizzes } from "db/schema";
import { New_Rocker } from "next/font/google";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function GET(request: Request,  { params }: { params: { id: string } }) {
  const id = await params.id
  console.log('request', request)
  return new NextResponse(JSON.stringify(id))
}


export async function DELETE(request: Request, { params }: { params: { id: string }}, response: Response) {

  try {
   const id = params.id

    if (!id) {
      return new NextResponse("Bad Request: Quiz ID is required", { status: 400 });
    }
  
    const deleteResult = await db.delete(quizzes).where(eq(quizzes.id, id));


    return new NextResponse(`Quiz with ID ${id} deleted successfully`, { status: 200 });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    // Return an error response
    return new NextResponse("Internal Server Error", { status: 500 });

  }
}

export async function PUT(request: Request, { params }: { params: { id: string }}, response: Response) {

  try {
   const id = params.id

     // Parse the request body as JSON
     const requestData = await request.json();
    if (!id) {
      return new NextResponse("Bad Request: Quiz ID is required", { status: 400 });
    }

    console.log("Updated quiz:", requestData);

    const updateResult = await db.update(quizzes).set({ name: requestData.name }).where(eq(quizzes.id, id));

    return new NextResponse(JSON.stringify(updateResult));
  } catch (error) {
    console.error("Error updating quiz:", error);
    // Return an error response
    return new NextResponse("Internal Server Error", { status: 500 });

  }
}

