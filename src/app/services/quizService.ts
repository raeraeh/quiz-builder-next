import { CreateQuizRequest, Quiz } from '@components/api/QuizClient';
import { db } from 'db';
import { quizzes, steps } from 'db/schema';
import { eq } from 'drizzle-orm';

export async function createQuizHandler(data: any) {
  // const rows = await db.select().from(quizzes).where(eq(quizzes.name, data));

  // if (rows.length !== 0) {
  //   throw new Error('Quiz with the same name already exists.');
  // }

  const newQuiz = await db.insert(quizzes).values({ name: data }).returning();
  return newQuiz;
}

export async function getQuizzesHandler() {
  try {
    const rows = db
      .select({
        quizzes: quizzes,
        steps: steps,
      })
      .from(quizzes)
      .leftJoin(steps, eq(quizzes.id, steps.quizId))
      .all();

    if (rows.length === 0) {
      return null; // Quiz not found
    }

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

    return result;
  } catch (error) {
    console.error('Error retrieving quiz:', error);
    throw error;
  }
}

export function objectToArray(data: any) {
  const result = Object.values(data);
  return result;
}
