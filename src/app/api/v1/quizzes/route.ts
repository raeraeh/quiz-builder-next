
import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { quizzes, steps } from "../../../../../db/schema";
import { eq } from 'drizzle-orm';
import { Quiz } from '../../../../api/QuizClient'
import { Step } from '../../../../api/StepClient' 

export async function GET(request: Request) {
  const rows = db.select({
    quizzes: quizzes,
    steps: steps,
  }).from(quizzes).leftJoin(steps, eq(quizzes.id, steps.quizId)).all();

  type Quiz = typeof quizzes.$inferSelect;
  type Step = typeof steps.$inferSelect;
  

  const result = rows.reduce<{ quizzes: Quiz; steps: Step[] }[]>(
    (acc, row) => {
      const quizzes = row.quizzes;
      const steps = row.steps;
  
      const existingEntry = acc.find(entry => entry.quizzes.id === quizzes.id);
  
      if (existingEntry) {
        if (steps) {
          existingEntry.steps.push(steps);
        }
      } else {
        acc.push({ quizzes, steps: steps ? [steps] : [] });
      }
  
      return acc;
    },
    []
  );
  
  console.log(result)
  return new NextResponse(JSON.stringify(result))
}


export async function POST(request: Request, response: Response ) {

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
