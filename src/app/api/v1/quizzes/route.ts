
import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { quizzes, steps } from "../../../../../db/schema";
import { eq } from 'drizzle-orm';
import { Quiz } from '../../../../api/QuizClient'
import { Step } from '../../../../api/StepClient' 


//helper methods

// type RowInserterResult<EntityOne extends { id: string }, EntityTwo extends { [key: string]: EntityOne[keyof EntityOne] }> = {
//   entitiesOne: EntityOne[];
//   entitiesTwo: { entityId: EntityOne['id']; values: EntityTwo[] }[];
// };



// const rowInserter = <
//   EntityOne extends { id: string; },
//   EntityTwo extends { [key: string]: EntityOne[keyof EntityOne]; }
// >(
//   rows: any[],
//   tableOne: keyof EntityOne,
//   tableTwo: keyof EntityTwo
// ): RowInserterResult<EntityOne, EntityTwo> => {
//   return rows.reduce(
//     (acc, row) => {
//       const tableOneEntry = row[tableOne];
//       const tableTwoEntry = row[tableTwo];

//       const existingEntry = acc.entitiesOne.find((entry: any) => entry.id === tableOneEntry?.id);

//       if (existingEntry) {
//         if (tableTwoEntry) {
//           existingEntry.values.push(tableTwoEntry);
//         }
//       } else {
//         acc.entitiesOne.push(tableOneEntry as EntityOne);
//         if (tableTwoEntry) {
//           acc.entitiesTwo.push({ entityId: tableOneEntry?.id, values: [tableTwoEntry] });
//         }
//       }

//       return acc;
//     },
//     []
//   );
// };


export async function GET(request: Request) {
  const rows = db.select({
    quizzes: quizzes,
    steps: steps,
  }).from(quizzes).leftJoin(steps, eq(quizzes.id, steps.quizId)).all();


  // type Quiz = typeof quizzes.$inferSelect;
  // type Step = typeof steps.$inferSelect;
  
const result = rows.reduce<Record<string, Quiz>>((acc, row) => {
    const quiz = row.quizzes;
    const step = row.steps;

    const existingEntry = acc[quiz.id];

    if (!existingEntry) {
      const newQuiz: Quiz = {
        id: quiz.id,
        name: quiz.name ?? '',
        steps: [],
      };
      acc[quiz.id] = newQuiz;
    }
    if (step && step.id) {
      acc[quiz.id]?.steps?.push(step.id);
    }
    return acc;
  }, {});


  const resultArray = Object.values(result)

  return new NextResponse(JSON.stringify(resultArray))
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


