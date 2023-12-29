import { db } from 'db';
import { steps } from 'db/schema';
import { NewStep } from '../api/v1/quizzes/[quizId]/steps/route';
import { eq } from 'drizzle-orm';

export class StepService {
  static async createStep(stepData: NewStep) {
    try {
      const newStep = await db.insert(steps).values({ name: stepData.name, quizId: stepData.quizId }).returning();
      return newStep;
    } catch (error) {
      console.error('Error creating new step:', error);
      throw error;
    }
  }

  static async getStep(data: string) {
    try {
      const stepId = data;

      const rows = await db.select().from(steps).where(eq(steps.id, stepId));

      if (rows.length === 0) {
        throw new Error('Step does not exist');
      }
      return rows[0];
    } catch (error) {
      console.error('Error retrieving step:', error);
      throw error;
    }
  }

  static async deleteStep(data: string) {
    try {
      const stepId = data;
      const deleteStep = await db.delete(steps).where(eq(steps.id, stepId));
      return deleteStep;
    } catch (error) {
      console.error('Error creating new step:', error);
      throw error;
    }
  }
}

//update, delete

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
