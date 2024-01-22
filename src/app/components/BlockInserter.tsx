import { BlockClient, BlockType } from '../../api/BlockClient';
import { blockLibrary } from './blocks/BlockLibrary';
import { Box, Button, Flex } from '@chakra-ui/react';

interface BlockInserterProps {
  // position: number;
  quizId: string;
  stepId: string;
}

export const BlockInserter = ({ stepId, quizId }: BlockInserterProps) => {
  const addBlock = (blockType: BlockType) => {
    const newBlock = {
      quizId,
      stepId,
      type: blockType,
      // position: position,
      data: blockLibrary[blockType].factory(),
    };

    BlockClient.createBlock(newBlock);
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      {Object.keys(blockLibrary).map((block) => {
        return (
          <Button variant="link" key={block} aria-label={`select ${block} block`} onClick={() => addBlock(block as BlockType)}>
            {blockLibrary[block as BlockType].inserterOptions.label}
          </Button>
        );
      })}
    </Flex>
  );
};
