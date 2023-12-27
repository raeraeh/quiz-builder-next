import { db } from 'db';
import { steps } from 'db/schema';
import { NewStep } from '../api/v1/quizzes/[quizId]/steps/route';

export async function createStepHandler(stepData: NewStep) {
  console.log('data in step service');

  try {
    const newStep = await db.insert(steps).values({ name: stepData.name, quizId: stepData.quizId }).returning();
    return newStep;
  } catch (error) {
    console.error('Error creating new step:', error);
    throw error;
  }
}

// export async function getStepHandler(data: string) {
//   try {
//     const quizId = data;

//     const rows = await db.select().from(quizzes).where(eq(quizzes.id, quizId));

//     if (rows.length === 0) {
//       throw new Error('Quiz does not exist');
//     }
//     return rows[0];
//   } catch (error) {
//     console.error('Error retrieving quiz:', error);
//     throw error;
//   }
// }
