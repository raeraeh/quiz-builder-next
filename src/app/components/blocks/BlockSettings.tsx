// dynamic props - block id, block type, block data
// make getblock request
import { Box, Button, Flex, FormLabel } from '@chakra-ui/react';

import { BlockClient } from '../../../api/BlockClient';

import { FormInput } from '../FormInput';
import { useStepEditorContext } from '../StepEditor/StepEditorContext';

interface BlockEditorProps {
  stepId: string;
}

export function BlockSettings({ stepId }: BlockEditorProps) {
  const stepEditorContext = useStepEditorContext();
  const block = stepEditorContext?.block;
  if (!block) return <>Select a block</>;
  return (
    <>
      <Box maxW="350px" display="flex" flexDirection="column" gap={2}>
        {Object.keys(stepEditorContext?.block?.data ?? {}).map((key) => {
          return (
            <Flex alignItems="center" justify="space-between" gap="2">
              <FormLabel fontSize="sm" mb={0}>
                {key}:
              </FormLabel>
              <FormInput
                width="auto"
                size="sm"
                variant="outline"
                boxShadow="sm"
                rounded="md"
                value={stepEditorContext?.block?.data[key]}
                onChange={(e) => {
                  stepEditorContext?.block &&
                    stepEditorContext?.setBlock({
                      ...stepEditorContext?.block,
                      data: {
                        ...stepEditorContext?.block?.data,
                        [key]: e.target.value,
                      },
                    });
                }}
              />
            </Flex>
          );
        })}
        {stepEditorContext?.block && (
          <Button
            aria-label="update block"
            colorScheme="teal"
            fontSize="16px"
            size="sm"
            onClick={() =>
              BlockClient.updateBlock({
                stepId,
                ...block,
              })
            }
          >
            Save
          </Button>
        )}
      </Box>
    </>
  );
}
