import { CreateQuizRequest, Quiz } from '@components/api/QuizClient';
import { db } from 'db';
import { quizzes, steps } from 'db/schema';
import { eq } from 'drizzle-orm';
import { NewQuiz } from '../api/v1/quizzes/[quizId]/route';

export async function createQuizHandler(data: string) {
  try {
    const newQuiz = await db.insert(quizzes).values({ name: data }).returning();
    return newQuiz;
  } catch (error) {
    console.error('Error creating new quiz:', error);
    throw error;
  }
}

export async function getQuizHandler(data: string) {
  try {
    const quizId = data;

    const rows = await db.select().from(quizzes).where(eq(quizzes.id, quizId));

    if (rows.length === 0) {
      throw new Error('Quiz does not exist');
    }
    return rows[0];
  } catch (error) {
    console.error('Error retrieving quiz:', error);
    throw error;
  }
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
    console.error('Error retrieving quizzes:', error);
    throw error;
  }
}

export function objectToArray(data: any) {
  const result = Object.values(data);
  return result;
}

export async function deleteQuizHandler(data: string) {
  try {
    const deletedQuiz = await db.delete(quizzes).where(eq(quizzes.id, data));
    return deletedQuiz;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
}

export async function upDateQuizHandler(quizData: NewQuiz, quizId: string) {
  try {
    const updateQuiz = await db.update(quizzes).set({ name: quizData.name }).where(eq(quizzes.id, quizId));

    return updateQuiz;
  } catch (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }
}
