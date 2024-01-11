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
  const block = stepEditorContext?.selectedBlock;
  if (!block) return <>Select a block</>;
  return (
    <>
      <Box maxW="350px" display="flex" flexDirection="column" gap={2}>
        {Object.keys(stepEditorContext?.selectedBlock?.data ?? {}).map((key) => {
          return (
            <Flex key={key} alignItems="center" justify="space-between" gap="2">
              <FormLabel fontSize="sm" mb={0}>
                {key}:
              </FormLabel>
              <FormInput
                width="auto"
                size="sm"
                variant="outline"
                boxShadow="sm"
                rounded="md"
                value={stepEditorContext?.selectedBlock?.data[key]}
                onChange={(e) => {
                  stepEditorContext?.selectedBlock &&
                    stepEditorContext?.setSelectedBlock({
                      ...stepEditorContext?.selectedBlock,
                      data: {
                        ...stepEditorContext?.selectedBlock?.data,
                        [key]: e.target.value,
                      },
                    });
                }}
              />
            </Flex>
          );
        })}

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
        <Button
          aria-label="delete block"
          colorScheme="teal"
          variant="outline"
          fontSize="16px"
          size="sm"
          onClick={() => BlockClient.deleteBlock({ stepId, blockId: block?.id })}
        >
          Delete block
        </Button>
      </Box>
    </>
  );
}
