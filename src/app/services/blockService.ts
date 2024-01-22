import { db } from 'db';
import { blocks } from 'db/schema';
import { eq } from 'drizzle-orm';
import { NewBlock } from '../api/v1/steps/[stepId]/blocks/route';

export class BlockService {
  static async createBlock(blockData: NewBlock) {
    try {
      const newBlock = await db
        .insert(blocks)
        .values({ stepId: blockData.stepId, position: blockData.position, data: blockData.data, type: blockData.type })
        .returning();
      return newBlock;
    } catch (error) {
      console.error('Error creating new block:', error);
      throw error;
    }
  }
  static async getBlock(blockData: string) {
    try {
      const blockId = blockData;

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

  static async updateBlock(blockData: NewBlock, blockId: string) {
    try {
      const updateBlock = await db
        .update(blocks)
        .set({ stepId: blockData.stepId, position: blockData.position, data: blockData.data, type: blockData.type })
        .where(eq(blocks.id, blockId));

      return updateBlock;
    } catch (error) {
      console.error('Error updating block:', error);
      throw error;
    }
  }

  static async deleteBlock(blockId: string) {
    try {
      const deleteBlock = await db.delete(blocks).where(eq(blocks.id, blockId));

      return deleteBlock;
    } catch (error) {
      console.error('Error deleting block:', error);
      throw error;
    }
  }
}
