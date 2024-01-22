'use client';
import QuizClient, { Quiz, quizRoute } from '../../api/QuizClient';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormInput } from './FormInput';

import { Button, Flex } from '@chakra-ui/react';

interface QuizSettingsProps {
  quizId: string;
}

function QuizSettings({ quizId }: QuizSettingsProps) {
  const [quiz, setQuiz] = useState<Quiz | null>();

  const updateQuiz = (propertyName: keyof Quiz, value: Quiz[typeof propertyName]) => {
    if (quiz) {
      setQuiz({
        ...quiz,
        [propertyName]: value,
      });
    }
  };

  const { data: quizRes } = useQuery({
    queryKey: [quizRoute, quizId],
    queryFn: async () => {
      const quiz = await QuizClient.getQuiz(quizId);

      return quiz;
    },
    enabled: !!quizId,
  });

  useEffect(() => {
    console.log(quizRes);
    if (quizRes) {
      setQuiz({ ...quizRes });
    }
  }, [quizRes]);

  return (
    <Flex alignItems="center" gap="2">
      <FormInput value={quiz?.name ?? ''} onChange={(e) => updateQuiz('name', e.target.value)} />

      <Button
        aria-label="update quiz"
        colorScheme="teal"
        fontSize="16px"
        size="sm"
        onClick={() => {
          if (quiz) {
            QuizClient.updateQuiz(quiz);
          }
        }}
      >
        save
      </Button>
    </Flex>
  );
}

export default QuizSettings;
