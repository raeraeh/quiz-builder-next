import { NextResponse } from 'next/server';
import { db } from 'db';
import { quizzes, steps } from 'db/schema';
import { eq } from 'drizzle-orm';

type NewStep = typeof steps.$inferInsert;

export async function POST(request: Request, { params }: { params: { quizId: string } }) {
  try {
    if (!params.quizId) {
      return new NextResponse('Not found', { status: 404 });
    }
    const quizId = params.quizId;
    const rows = await db.select().from(quizzes).where(eq(quizzes.id, quizId));

    if (rows.length === 0) {
      return new NextResponse('Not found', { status: 404 });
    }

    const stepData: NewStep = await request.json();

    const newStep = await db
      .insert(steps)
      .values({
        name: stepData.name,
        quizId,
      })
      .returning();

    // Log the newly created quiz
    console.log('Created quiz:', newStep);

    return new NextResponse(JSON.stringify(newStep), {
      status: 201, // 201 Created status code for successful creation
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
