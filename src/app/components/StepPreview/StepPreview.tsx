import { useQueries } from '@tanstack/react-query';
import { Block, BlockClient, blockRoute } from '../../../api/BlockClient';
import { Step } from '../../../api/StepClient';

import './StepPreview.css';
import { blockLibrary } from '../blocks/BlockLibrary';

import { AbsoluteCenter, Box, Container, VStack } from '@chakra-ui/react';

import NewBlockPopoverModal from '../NewBlockPopoverModal';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';
import { useTabsContext } from '../Tabs/TabsContext';

interface BlockRendererProps {
  block?: Block | null;
  isSelected?: boolean;
}

export const BlockRenderer = ({ block, isSelected }: BlockRendererProps): JSX.Element => {
  if (!block) {
    return <></>;
  }
  const BlockComponent = blockLibrary[block?.type]?.block;

  if (!BlockComponent) {
    return <></>;
  }

  return <BlockComponent {...block.data} />;
};

interface StepPreviewProps {
  step: Step;
  quizId: string;
}

function StepPreview({ step, quizId }: StepPreviewProps) {
  const stepEditorContext = useStepEditorContext();
  const tabContext = useTabsContext();
  console.log('tab', tabContext?.selectedTab);

  const blocksRes = useQueries({
    queries:
      step.blocks?.map((blockId: string) => {
        return {
          queryKey: [blockRoute, blockId],
          queryFn: async () => {
            return await BlockClient.getBlock({ blockId, stepId: step.id });
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
              w="100%"
              p={1}
              color="white"
              className={`content-block ${isSelected ? 'content-block-hightlight' : ''}`}
              onClick={() => {
                stepEditorContext?.setSelectedBlockId(block?.id ?? '');
                tabContext?.setSelectedTab('2');
              }}
            >
              <Container centerContent>
                <Box w="60%">
                  <BlockRenderer block={isSelected ? stepEditorContext?.selectedBlock : block} isSelected={isSelected} />
                </Box>
              </Container>
              <NewBlockPopoverModal triggerIcon stepId={step.id} quizId={quizId} />
            </Box>
          );
        })}
      </VStack>
    </>
  );
}

export default StepPreview;
