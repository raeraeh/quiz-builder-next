'use client';

import { useState } from 'react';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import StepPreview from '../../components/StepPreview/StepPreview';
import { StepEditorProvider } from './StepEditorContext';

import { Box, Button, Flex, forwardRef } from '@chakra-ui/react';

import EditSideBar from '../../components/EditSideBar';
import NewBlockPopoverModal from '../../components/NewBlockPopoverModal';
import { queryClient } from '@components/lib/QueryClient';

function StepEditor() {
  const { quizId, stepId } = useParams<{ quizId: string; stepId: string }>();

  const [step, setStep] = useState<Step | null>();

  const { data: stepRes } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      if (!stepId || !quizId) {
        return;
      }

      try {
        const response = await StepClient.getStep({ stepId, quizId });
        const stepData = response.data;
        setStep(stepData);

        return stepData;
      } catch (error) {
        console.error('Error fetching step:', error);
        throw error;
      }
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
