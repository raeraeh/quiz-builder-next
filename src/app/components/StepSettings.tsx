import { Flex, Button, FormLabel } from '@chakra-ui/react';
import StepClient, { Step } from '../../api/StepClient';

import { FormInput } from './FormInput';
import { useState } from 'react';

interface StepSettingsProps {
  step?: Step | null;
  quizId: string;
}

function StepSettings({ step, quizId }: StepSettingsProps) {
  const [stepName, setStepName] = useState(step?.name ?? '');
  return (
    <Flex alignItems="center" gap="2">
      <FormLabel mb={0} fontSize="sm">
        Step Name:
      </FormLabel>
      <FormInput
        width="auto"
        size="sm"
        variant="outline"
        boxShadow="sm"
        rounded="md"
        value={stepName}
        onChange={(e) => setStepName(e.target.value)}
      />

      <Button
        aria-label="update step"
        colorScheme="teal"
        fontSize="16px"
        size="sm"
        onClick={() => {
          if (step) {
            StepClient.updateStep({
              ...step,
              name: stepName,
              quizId,
            });
          }
        }}
      >
        save
      </Button>
    </Flex>
  );
}

export default StepSettings;
