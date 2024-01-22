import { BlockType } from '../../../api/BlockClient';
import { InputBlock } from './InputBlock';
import { TextareaBlock } from './TextareaBlock';

export interface BlockDefinition {
  inserterOptions: {
    label: string;
  };

  block: React.FC<any>;

  factory: () => Record<string, string>;
}

const InputBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Input',
  },

  block: InputBlock,

  factory: () => ({
    fieldName: 'helo',
    label: 'label text',
    placeholder: 'placeholder text',
  }),
};

const TextareaBlockDefinition: BlockDefinition = {
  inserterOptions: {
    label: 'Textarea',
  },

  block: TextareaBlock,

  factory: () => ({
    placeholder: 'placeholder text',
  }),
};

export const blockLibrary: Record<BlockType, BlockDefinition> = {
  [BlockType.TEXTAREA]: TextareaBlockDefinition,
  [BlockType.INPUT]: InputBlockDefinition,
};
