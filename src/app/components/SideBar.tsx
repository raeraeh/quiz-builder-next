'use client';

import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';

import { Button, Flex, IconButton, Spacer, TabsProvider, VStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import QuizClient, { Quiz, quizRoute } from '@components/api/QuizClient';
import Link from 'next/link';
import StepClient, { stepRoute } from '@components/api/StepClient';

import Tabs from './Tabs/Tabs';

import { useState } from 'react';
import { useParams } from 'next/navigation';

function SideBar() {
  const { quizId } = useParams();
  const [selectedQuizId, setSelectedQuizId] = useState((quizId as string) ?? '');
  const results = useQueries({
    queries: [
      {
        queryKey: [quizRoute],
        queryFn: async () => {
          return await QuizClient.getQuizzes();
        },
        placeholderData: keepPreviousData,
      },
      {
        queryKey: [quizRoute, selectedQuizId],
        queryFn: async () => {
          const data = await QuizClient.getQuiz(selectedQuizId);

          return data;
        },
        placeholderData: keepPreviousData,
        enabled: !!selectedQuizId,
      },
    ],
  });

  const [{ data: quizzes }, { data: selectedQuiz }] = results;

  const generateQuiz = () => {
    const newQuiz = { name: 'new quiz' };

    QuizClient.createQuiz(newQuiz);
  };

  const generateStep = () => {
    if (!selectedQuizId) {
      return;
    }
    const newStep = { quizId: selectedQuizId, name: 'new step' };
    StepClient.createStep(newStep);
  };
  const tabsData = [
    {
      id: '1',
      title: 'Quizzes',
      component: () => (
        <VStack spacing={3} align="stretch">
          <Button size="sm" variant="outline" borderColor={'teal.500'} onClick={() => generateQuiz()}>
            + Add a quiz
          </Button>

          {quizzes?.map?.((quiz) => (
            <QuizSideBarItem key={quiz.id} quiz={quiz} setSelectedQuizId={setSelectedQuizId} />
          ))}
        </VStack>
      ),
    },
    ...(selectedQuizId
      ? [
          {
            id: '2',
            title: 'Steps',
            component: () => (
              <VStack spacing={4} align="stretch">
                <Button size="sm" variant="outline" borderColor={'teal.500'} onClick={() => generateStep()}>
                  + Add a step
                </Button>

                {selectedQuiz?.steps?.map((stepId: string) => (
                  <StepSideBarItem key={stepId} stepId={stepId} quizId={selectedQuizId} />
                ))}
              </VStack>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="sidebar left-sidebar">
        <Tabs tabsData={tabsData} />
      </div>
    </>
  );
}

function QuizSideBarItem({ quiz, setSelectedQuizId }: { quiz: Quiz; setSelectedQuizId: React.Dispatch<React.SetStateAction<string>> }) {
  const deleteQuiz = async (quiz: Quiz) => {
    try {
      await QuizClient.deleteQuiz(quiz.id);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleQuizSelection = (quizId: string) => {
    return setSelectedQuizId(quizId);
  };
  return (
    <Flex>
      <Button pr={2} colorScheme="teal" variant="link">
        <Link href={`/quizzes/${quiz.id}/`} onClick={() => handleQuizSelection(quiz.id)}>
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

function StepSideBarItem({ stepId, quizId }: { stepId: string; quizId: string }) {
  const { data: step } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      return await StepClient.getStep({
        quizId,
        stepId,
      });
    },
  });

  const deleteStep = async (quizId: string, stepId: string) => {
    try {
      await StepClient.deleteStep({
        quizId,
        stepId,
      });
    } catch (error) {
      console.error('Error deleting step:', error);
    }
  };

  return (
    <div>
      <Flex align="center">
        <Link href={`/quizzes/${quizId}/steps/${stepId}`}> {step?.name}</Link>
        <Spacer />
        <IconButton
          colorScheme="teal"
          fontSize="16px"
          variant="outline"
          size="sm"
          aria-label="delete step"
          onClick={() => deleteStep(quizId, stepId)}
          icon={<DeleteIcon />}
        />
      </Flex>
    </div>
  );
}

export default SideBar;
