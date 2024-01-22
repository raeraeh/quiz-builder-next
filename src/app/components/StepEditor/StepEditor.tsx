'use client';

import { useEffect, useState } from 'react';
import StepClient, { Step, stepRoute } from '../../../api/StepClient';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import StepPreview from '../../components/StepPreview/StepPreview';
import { StepEditorProvider } from './StepEditorContext';

import { Box, Text, Flex, forwardRef } from '@chakra-ui/react';

import NewBlockPopoverModal from '../../components/NewBlockPopoverModal';
import { queryClient } from '@components/lib/QueryClient';
import DataPreview from '../DataPreview';
import StepSettings from '../StepSettings';
import { BlockSettings } from '../blocks/BlockSettings';
import Tabs, { TabWithTitleProps } from '../Tabs/Tabs';
import { TabsProvider } from '../Tabs/TabsContext';

function StepEditor() {
  const {
    quizId,
    stepId,
  }: {
    quizId: string;
    stepId: string;
  } = useParams();

  const [step, setStep] = useState<Step | null>();

  const { data: stepRes } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      try {
        const step = await StepClient.getStep({ stepId, quizId });

        return step;
      } catch (error) {
        console.error('Error fetching step:', error);
        throw error;
      }
    },
    enabled: !!stepId,
  });

  useEffect(() => {
    console.log(stepRes);
    if (stepRes) {
      setStep({ ...stepRes });
    }
  }, [stepRes]);

  const tabsData: TabWithTitleProps[] = [
    {
      id: '1',
      title: 'Step Settings',
      component: () => <StepSettings step={step} quizId={quizId} />,
    },
    {
      id: '2',
      title: 'Block Settings',
      component: () => <BlockSettings stepId={stepId} />,
    },
    { id: '3', title: 'Data Preview', component: () => <DataPreview /> },
  ];

  if (!step) {
    return <></>;
  }

  return (
    <>
      <StepEditorProvider stepId={stepId}>
        <TabsProvider>
          <Box w="100%" p={6}>
            <Flex>
              <NewBlockPopoverModal stepId={stepId} quizId={quizId} btnText="New Block" />
            </Flex>
            <Text as="b" color="white" fontSize="3xl">
              {' '}
              Welcome to Form Mason
            </Text>
            <Text color="white"> Form mason lets you build multi-step, flexible and custom forms.</Text>
            <Text color="white">Here are some example blocks that you might want to use: </Text>
            <StepPreview step={step} quizId={quizId ?? ''} />
          </Box>

          <div className="sidebar right-sidebar">
            <Tabs noTabsProvider tabsData={tabsData} />
          </div>
        </TabsProvider>
      </StepEditorProvider>
    </>
  );
}

export default StepEditor;
