import { db } from 'db';
import { steps, blocks } from 'db/schema';
import { NewStep } from '../api/v1/quizzes/[quizId]/steps/route';
import { eq } from 'drizzle-orm';
import { Step } from '@components/api/StepClient';

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

      const rows = await db.select().from(steps).leftJoin(blocks, eq(steps.id, blocks.stepId));

      if (rows.length === 0) {
        throw new Error('Step does not exist');
      }

      const result = rows.reduce<Record<string, Step>>((acc, row) => {
        const step = row.steps;
        const block = row.blocks;

        const existingEntry = acc[step.id];

        if (!existingEntry) {
          const newStep: Step = {
            id: step.id,
            name: step.name ?? '',
            blocks: [],
          };
          acc[step.id] = newStep;
        }
        if (block && block.id) {
          acc[step.id]?.blocks?.push(block.id);
        }
        return acc;
      }, {});

      return result[stepId];
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

  static async updateStep(stepData: NewStep, stepId: string) {
    try {
      const updateStep = await db
        .update(steps)
        .set({
          name: stepData.name,
        })
        .where(eq(steps.id, stepId));

      return updateStep;
    } catch (error) {
      console.error('Error updating step:', error);
      throw error;
    }
  }
}
