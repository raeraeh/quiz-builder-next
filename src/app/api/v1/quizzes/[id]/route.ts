import { db } from "db";
import { quizzes } from "db/schema";
import { NextResponse } from "next/server";


export async function GET(request: Request,  { params }: { params: { id: string } }) {
  const id = await params.id
  return new NextResponse(JSON.stringify(id))
}
