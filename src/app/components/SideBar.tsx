'use client';

import styles from './SideBar.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, VStack, useMediaQuery } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronRightIcon, SmallAddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import QuizClient, { Quiz, quizRoute } from '@components/api/QuizClient';
import Link from 'next/link';
import StepClient, { stepRoute } from '@components/api/StepClient';

function SideBar() {
  const { data: quizzes } = useQuery({
    queryKey: [quizRoute],
    queryFn: async () => {
      return (await QuizClient.getQuizzes()).data;
    },
    placeholderData: keepPreviousData,
  });

  const generateQuiz = () => {
    
    const newQuiz = { name: 'new quiz' };

    QuizClient.createQuiz(newQuiz);
  };

  return (
    <>
      <div className="sidebar left-sidebar">
        <Button variant="outline" borderColor={'teal.500'} onClick={() => generateQuiz()}>
          + Add a quiz!
        </Button>
        {quizzes?.map?.((quiz) => (
          <QuizSideBarItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </>
  );
}

function QuizSideBarItem({ quiz }: { quiz: Quiz }) {
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  const deleteQuiz = (quiz: Quiz) => {
    QuizClient.deleteQuiz(quiz.id);
  };

  const updateQuiz = (quiz: Quiz) => {
    const newName = prompt('Please enter new name', quiz.name) ?? quiz.name;
    QuizClient.updateQuiz({
      ...quiz,
      name: newName,
    });
  };

  const addStep = (quiz: Quiz) => {
    const newStep = {
      quizId: quiz.id,
      name: 'new step',
    };
    StepClient.createStep(newStep);
  };

  return (
    <VStack align="stretch" spacing={3}>
      <Flex>
        <Button pr={2} colorScheme="teal" variant="link">
          <Link href={`/quizzes/${quiz.id}/`}>{quiz.name}</Link>
          {/* <Link href="hello">{quiz.name}</Link> */}
        </Button>
        <Spacer />
        {isLargerThan1024 ? (
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

            <IconButton aria-label="update quiz" colorScheme="teal" variant="outline" fontSize="16px" size="sm" onClick={() => updateQuiz(quiz)}>
              <EditIcon />
            </IconButton>
            <Button aria-label="add step" colorScheme="teal" fontSize="16px" size="sm" onClick={() => addStep(quiz)}>
              <SmallAddIcon />
              Add a step
            </Button>
          </Flex>
        ) : (
          <Menu>
            <MenuButton as={Button} size="sm" colorScheme="teal" rightIcon={<ChevronDownIcon />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => deleteQuiz(quiz)}>Delete quiz</MenuItem>
              <MenuItem onClick={() => updateQuiz(quiz)}>Edit quiz</MenuItem>
              <MenuItem onClick={() => addStep(quiz)}>Add a step</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      {quiz.steps.map((stepId: string) => (
        <StepSideBarItem key={stepId} stepId={stepId} quiz={quiz} />
      ))}
    </VStack>
  );
}

function StepSideBarItem({ stepId, quiz }: { stepId: string; quiz: Quiz }) {
  const { data: step } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      const response = await StepClient.getStep({
        quizId: quiz.id,
        stepId: stepId,
      });
  
      console.log('Step API Response:', response);
  
      if (response === undefined) {
        // Handle undefined case, e.g., return an empty object
        return {};
      }
  
      return response;
    
    },
  });

  const deleteStep = (quiz: Quiz, stepId: string) => {
    StepClient.deleteStep({
      quizId: quiz.id,
      stepId: stepId,
    });
  };

  return (
    <div>
      <Flex align="center">
        <ChevronRightIcon mr={1} />

        <Link href={`/quizzes/${quiz.id}/steps/${stepId}`}> {step?.name}</Link>
        {/* <Link href="hello"> {step?.name}</Link>
         */}
        <Spacer />
        <IconButton
          colorScheme="teal"
          fontSize="16px"
          variant="outline"
          size="sm"
          aria-label="delete step"
          onClick={() => deleteStep(quiz, stepId)}
          icon={<DeleteIcon />}
        ></IconButton>
      </Flex>
    </div>
  );
}

export default SideBar;
