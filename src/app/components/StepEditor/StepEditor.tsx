import { useParams } from 'react-router-dom';

import { useState } from 'react';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';
import { useQuery } from '@tanstack/react-query';

import StepPreview from '../../components/StepPreview/StepPreview';
import { StepEditorProvider } from './StepEditorContext';

import { Box, Button, Flex, forwardRef } from '@chakra-ui/react';

import { BlockClient, BlockType } from '../../../api/BlockClient';
import { blockLibrary } from '../../components/blocks/BlockLibrary';
import PopoverModal from '../../components/NewBlockPopoverModal';
import EditSideBar from '../../components/EditSideBar';
import NewBlockPopoverModal from '../../components/NewBlockPopoverModal';

function StepEditor() {
  const { quizId, stepId } = useParams();
  const [step, setStep] = useState<Step | null>();

  const { data: stepRes } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      if (!stepId || !quizId) {
        return;
      }
      const step = await StepClient.getStep({ stepId, quizId });
      setStep(step);
      return step;
    },
    enabled: !!stepId,
  });

  return (
    <>
      <StepEditorProvider stepId={stepId}>
        <Box w="100%" p={6}>
          <Flex>
            <NewBlockPopoverModal stepId={stepId} quizId={quizId} btnText="Add Block" />
          </Flex>
          <Box className="step-editor">
            <StepPreview step={step} quizId={quizId ?? ''} />
          </Box>
        </Box>

        <EditSideBar step={step} quizId={quizId ?? ''} />
      </StepEditorProvider>
    </>
  );
}

export default StepEditor;
