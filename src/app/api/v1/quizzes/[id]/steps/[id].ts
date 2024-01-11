import { Quiz } from "@components/api/QuizClient";
import { db } from "db";
import { quizzes, steps } from "db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server"

export async function GET(request: Request,  { params }: { params: { id: string } }) {
    const id = await params.id
    console.log('request', request)
    return new NextResponse(JSON.stringify(id))
  }
  

  export async function POST(request: Request, response: Response ) {

    try {
      // Log the request information to the server console
      console.log("Received POST request:", request);
  
      // Parse the request body as JSON
      const requestData = await request.json();
  
    //   const rows = db.select({
    //     quizzes: quizzes,
    //     steps: steps,
    //   }).from(quizzes).leftJoin(steps, eq(quizzes.id, steps.quizId)).all();

      const newStep = await db.update(steps).set({name: requestData.name}).where(eq(steps.id, requestData.quizId))
    
    
  
      return new NextResponse(JSON.stringify(newStep), {
        status: 201, // 201 Created status code for successful creation
      });
    } catch (error) {
      console.error("Error creating step:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  
  