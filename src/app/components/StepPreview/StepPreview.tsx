import { useQueries } from '@tanstack/react-query';
import { Block, BlockClient, blockRoute } from '../../../api/BlockClient';
import { Step } from '../../../api/StepClient';

import './StepPreview.css';
import { blockLibrary } from '../blocks/BlockLibrary';

import { Box, VStack } from '@chakra-ui/react';

import NewBlockPopoverModal from '../NewBlockPopoverModal';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';

interface BlockRendererProps {
  block?: Block | null;
  isSelected?: boolean;
}

export const BlockRenderer = ({ block }: BlockRendererProps): JSX.Element => {
  if (!block) {
    return <></>;
  }

  const BlockComponent = blockLibrary[block?.type].block;

  return <BlockComponent {...block.data} />;
};

interface StepPreviewProps {
  step?: Step | null;
  quizId: string;
}

function StepPreview({ step, quizId }: StepPreviewProps) {
  const stepEditorContext = useStepEditorContext();
  console.log('step in step preview', step);

  const blocksRes = useQueries({
    queries:
      step?.blocks?.map((blockId: string) => {
        return {
          queryKey: [blockRoute, blockId],
          queryFn: async () => {
            return (await BlockClient.getBlock({ quizId, blockId, stepId: step.id })).data;
          },
        };
      }) ?? [],
  });

  return (
    <>
      <VStack py={4}>
        {blocksRes?.map(({ data: block }) => {
          const isSelected = stepEditorContext?.selectedBlockId === block?.id;
          return (
            <Box
              key={block?.id}
              w="20vw"
              p={1}
              color="white"
              className={`content-block ${isSelected ? 'content-block-hightlight' : ''}`}
              onClick={() => stepEditorContext?.setSelectedBlockId(block?.id ?? '')}
            >
              <BlockRenderer block={isSelected ? stepEditorContext?.block : block} isSelected={isSelected} />
              <NewBlockPopoverModal triggerIcon stepId={step?.id} quizId={quizId} />
            </Box>
          );
        })}
      </VStack>
    </>
  );
}

export default StepPreview;
