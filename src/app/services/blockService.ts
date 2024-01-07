import { db } from 'db';
import { blocks } from 'db/schema';
import { eq } from 'drizzle-orm';
import { NewBlock } from '../api/v1/quizzes/[quizId]/steps/[stepId]/blocks/route';

export class BlockService {
  static async createBlock(blockData: NewBlock) {
    try {
      console.log('blockservice', blockData);
      const newBlock = await db
        .insert(blocks)
        .values({ ...blockData })
        .returning();
      return newBlock;
    } catch (error) {
      console.error('Error creating new block:', error);
      throw error;
    }
  }
  static async getBlock(data: string) {
    try {
      const blockId = data;

      const rows = await db.select().from(blocks).where(eq(blocks.id, blockId));

      if (rows.length === 0) {
        throw new Error('Block does not exist');
      }
      return rows[0];
    } catch (error) {
      console.error('Error retrieving step:', error);
      throw error;
    }
  }
}
