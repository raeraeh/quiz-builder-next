'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Box, Button, Divider, Flex, IconButton, Spacer, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import QuizClient, { Quiz, quizRoute } from '@components/api/QuizClient';
import Link from 'next/link';
import StepClient, { stepRoute } from '@components/api/StepClient';
import TabContent from './Tabs/TabContent';
import Tabs from './Tabs/Tabs';
import Tab from './Tabs/Tab';
import { useState } from 'react';

function SideBar() {
  const { data: quizzes } = useQuery({
    queryKey: [quizRoute],
    queryFn: async () => {
      return (await QuizClient.getQuizzes()).data;
    },
    placeholderData: keepPreviousData,
  });

  const [selectedQuiz, setSelectedQuiz] = useState(quizzes?.[0]);

  const generateQuiz = () => {
    const newQuiz = { name: 'new quiz' };

    QuizClient.createQuiz(newQuiz);
  };

  const tabsData = [
    {
      id: '1',
      title: 'Quizzes',
      component: () => (
        <VStack spacing={3} align="stretch">
          <Button size="sm" variant="outline" borderColor={'teal.500'} onClick={() => generateQuiz()}>
            + Add a quiz!
          </Button>

          {quizzes?.map?.((quiz) => (
            <QuizSideBarItem key={quiz.id} quiz={quiz} setSelectedQuiz={setSelectedQuiz} />
          ))}
        </VStack>
      ),
    },
    {
      id: '2',
      title: 'Steps',
      component: () => (
        <VStack spacing={4} align="stretch">
          {selectedQuiz?.steps.length === 0 || !selectedQuiz ? (
            <Box>Selected quiz has no steps</Box>
          ) : (
            selectedQuiz?.steps.map((stepId: string) => <StepSideBarItem key={stepId} stepId={stepId} quiz={selectedQuiz} />)
          )}
        </VStack>
      ),
    },
  ];

  return (
    <>
      <div className="sidebar left-sidebar">
        <Tabs>
          <Flex gap={3}>
            {tabsData.map(({ id, title }) => (
              <>
                <Tab key={id} id={id}>
                  {title}
                </Tab>
              </>
            ))}
          </Flex>
          <Divider className="tabs-divider" orientation="horizontal" />

          <div className="tabs-content">
            {tabsData.map(({ id, component: TabComponent }) => (
              <>
                <TabContent key={id} id={id}>
                  <TabComponent />
                </TabContent>
              </>
            ))}
          </div>
        </Tabs>
      </div>
    </>
  );
}

function QuizSideBarItem({ quiz, setSelectedQuiz }: { quiz: Quiz; setSelectedQuiz: React.Dispatch<React.SetStateAction<Quiz | undefined>> }) {
  const deleteQuiz = async (quiz: Quiz) => {
    try {
      await QuizClient.deleteQuiz(quiz.id);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleQuizSelection = () => {
    return setSelectedQuiz(quiz);
  };
  return (
    <Flex>
      <Button pr={2} colorScheme="teal" variant="link">
        <Link href={`/quizzes/${quiz.id}/`} onClick={() => handleQuizSelection()}>
          {quiz.name}
        </Link>
      </Button>
      <Spacer />

      <Flex minWidth="max-content" alignItems="center" gap="2">
        <IconButton
          colorScheme="teal"
          fontSize="16px"
          variant="outline"
          size="sm"
          onClick={() => deleteQuiz(quiz)}
          aria-label="delete quiz"
          icon={<DeleteIcon />}
        ></IconButton>
      </Flex>
    </Flex>
  );
}

function StepSideBarItem({ stepId, quiz }: { stepId: string; quiz: Quiz }) {
  const { data: step, refetch: refetchStep } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      return (
        await StepClient.getStep({
          quizId: quiz.id,
          stepId,
        })
      ).data;
    },
  });

  const deleteStep = async (quizId: string, stepId: string) => {
    try {
      await StepClient.deleteStep({
        quizId,
        stepId,
      });

      refetchStep();
    } catch (error) {
      console.error('Error deleting step:', error);
    }
  };

  return (
    <div>
      <Flex align="center">
        <Link href={`/quizzes/${quiz.id}/steps/${stepId}`}> {step?.name}</Link>
        <Spacer />
        <IconButton
          colorScheme="teal"
          fontSize="16px"
          variant="outline"
          size="sm"
          aria-label="delete step"
          onClick={() => deleteStep(quiz.id, stepId)}
          icon={<DeleteIcon />}
        />
      </Flex>
    </div>
  );
}

export default SideBar;
