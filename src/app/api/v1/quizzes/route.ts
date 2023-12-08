
import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { quizzes } from "../../../../../db/schema";

  

export async function GET(request: Request) {
  const result = await db.select().from(quizzes)
  return new NextResponse(JSON.stringify(result))
}


export async function POST(request: Request, response: Response ) {
  // add new quiz to database
  console.log(request, response)
  
  // const data = await db.insert(quizzes).values({name: `${request.body}`}).returning().onConflictDoNothing()
  // return new NextResponse(JSON.stringify(response))

  try {
    // Log the request information to the server console
    console.log("Received POST request:", request);

    // Parse the request body as JSON
    const requestData = await request.json();

    // Add a new quiz to the database
    const newQuiz = await db.insert(quizzes).values({ name: requestData.name }).returning();

    // Log the newly created quiz
    console.log("Created quiz:", newQuiz);

    return new NextResponse(JSON.stringify(newQuiz), {
      status: 201, // 201 Created status code for successful creation
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
