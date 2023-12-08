
import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { quizzes } from "../../../../../db/schema";

  

export async function GET(request: Request) {
  const result = await db.select().from(quizzes)
  return new NextResponse(JSON.stringify(result))
}


export async function POST(request: Request, response: Response ) {
  // add new quiz to database
  console.log(request)
  
  // const data = await db.insert(quizzes).values({name: `${request.body}`}).returning().onConflictDoNothing()
  return new NextResponse(JSON.stringify(response))
}
