'use client';
import { Box, Button, Center, Container, HStack, Text } from '@chakra-ui/react';

interface QuizPreviewProps {
  quizId: string;
}
function QuizPreview({ quizId }: QuizPreviewProps) {
  return (
    <>
      <Box bg="gray.600" w="100%" m={4} color="white">
        <HStack>
          <Text fontSize="xl">{`"${quizId}"`}</Text>
        </HStack>
      </Box>
    </>
  );
}

export default QuizPreview;
