import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { Block, blockRoute, BlockClient } from '../../../api/BlockClient';

interface StepEditorContextData {
  selectedBlock?: Block | null;
  setSelectedBlock: (block: Block) => void;
  selectedBlockId: string;
  setSelectedBlockId: (blockId: string) => void;
  formData?: Record<string, any> | null;
  setFormData: (formData: Record<string, any>) => void;
}
const StepEditorContext = createContext<StepEditorContextData | null>(null);

export const useStepEditorContext = () => {
  const stepEditorContext = useContext(StepEditorContext);
  return stepEditorContext;
};

export const StepEditorProvider = ({ children, stepId }: { children: JSX.Element | JSX.Element[]; stepId: string }) => {
  const [selectedBlock, setSelectedBlock] = useState<Block | null>();
  const [selectedBlockId, setSelectedBlockId] = useState('');
  const [formData, setFormData] = useState({});

  const { data: blockRes } = useQuery({
    queryKey: [blockRoute, selectedBlockId],
    queryFn: async () => {
      if (!selectedBlockId || !stepId) {
        return;
      }

      const block = await BlockClient.getBlock({
        blockId: selectedBlockId,
        stepId,
      });

      setSelectedBlock(block.data);
      return block.data;
    },
    enabled: !!selectedBlockId,
  });

  return (
    <StepEditorContext.Provider
      value={{
        selectedBlock,
        setSelectedBlock,
        selectedBlockId,
        setSelectedBlockId,
        formData,
        setFormData,
      }}
    >
      {children}
    </StepEditorContext.Provider>
  );
};
