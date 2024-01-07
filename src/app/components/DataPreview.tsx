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

      {Object.entries(stepEditorContext?.block?.data ?? {}).map(([key, value]) => {
        return (
          <Box key={key} display="flex" pl={6}>
            <Text>{`"${key}": "${value}",`}</Text>
          </Box>
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
