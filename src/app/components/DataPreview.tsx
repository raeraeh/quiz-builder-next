import { Box, Flex, Text } from '@chakra-ui/react';
import { useStepEditorContext } from './StepEditor/StepEditorContext';
// import { useStepEditorContext } from '../pages/StepEditor/StepEditorContext';

function DataPreview() {
  const stepEditorContext = useStepEditorContext();
  return (
    <Box borderWidth="1px" borderRadius="md" p="4" bgColor="gray.100">
      <Flex>
        <Text ml="2" color="gray.500">
          {'{'}
        </Text>
      </Flex>

      {Object.entries(stepEditorContext?.selectedBlock?.data ?? {}).map(([key, value]) => {
        return (
          <Flex key={key} alignItems="left" pl={4}>
            <Text fontSize="xs">{`"${key}": "${value}",`}</Text>
          </Flex>
        );
      })}

      <Flex>
        <Text ml="2" color="gray.500">
          {'}'}
        </Text>
      </Flex>
    </Box>
  );
}

export default DataPreview;
