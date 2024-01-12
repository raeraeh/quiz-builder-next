'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tab,
  Tabs,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronRightIcon, SmallAddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import QuizClient, { Quiz, quizRoute } from '@components/api/QuizClient';
import Link from 'next/link';
import StepClient, { stepRoute } from '@components/api/StepClient';
import TabContent from './Tabs/TabContent';
import DataPreview from './DataPreview';

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

  const tabsData = [
    {
      id: '1',
      title: 'Quizzes',
      component: () => (
        <VStack spacing={4} align="stretch">
          <Button mt={4} variant="outline" borderColor={'teal.500'} onClick={() => generateQuiz()}>
            + Add a quiz!
          </Button>
          {quizzes?.map?.((quiz) => (
            <QuizSideBarItem key={quiz.id} quiz={quiz} />
          ))}
        </VStack>
      ),
    },
    {
      id: '2',
      title: 'Steps',
      component: () => <DataPreview />,
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

                {/* <TabComponent /> */}
              </>
            ))}
          </div>
        </Tabs>
        {/* <Button variant="outline" borderColor={'teal.500'} onClick={() => generateQuiz()}>
          + Add a quiz!
        </Button>
        {quizzes?.map?.((quiz) => (
          <QuizSideBarItem key={quiz.id} quiz={quiz} />
        ))} */}
      </div>
    </>
  );
}

function QuizSideBarItem({ quiz }: { quiz: Quiz }) {
  // const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');

  const deleteQuiz = async (quiz: Quiz) => {
    try {
      console.log('id', quiz.id);
      await QuizClient.deleteQuiz(quiz.id);
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  // const updateQuiz = (quiz: Quiz) => {
  //   const newName = prompt('Please enter new name', quiz.name) ?? quiz.name;
  //   QuizClient.updateQuiz({
  //     ...quiz,
  //     name: newName,
  //   });
  // };

  // const addStep = (quiz: Quiz) => {
  //   const newStep = {
  //     quizId: quiz.id,
  //     name: 'new step',
  //   };
  //   StepClient.createStep(newStep);
  // };

  return (
    <VStack align="stretch" spacing={3}>
      <Flex>
        <Button pr={2} colorScheme="teal" variant="link">
          <Link href={`/quizzes/${quiz.id}/`}>{quiz.name}</Link>
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

          {/* <IconButton aria-label="update quiz" colorScheme="teal" variant="outline" fontSize="16px" size="sm" onClick={() => updateQuiz(quiz)}>
              <EditIcon />
            </IconButton>
            <Button aria-label="add step" colorScheme="teal" fontSize="16px" size="sm" onClick={() => addStep(quiz)}>
              Add step
            </Button> */}
        </Flex>
      </Flex>

      {/* {quiz.steps.map((stepId: string) => (
        <StepSideBarItem key={stepId} stepId={stepId} quiz={quiz} />
      ))} */}
    </VStack>
  );
}

function StepSideBarItem({ stepId, quiz }: { stepId: string; quiz: Quiz }) {
  const { data: step } = useQuery({
    queryKey: [stepRoute, stepId],
    queryFn: async () => {
      return (
        await StepClient.getStep({
          quizId: quiz.id,
          stepId: stepId,
        })
      ).data;
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
