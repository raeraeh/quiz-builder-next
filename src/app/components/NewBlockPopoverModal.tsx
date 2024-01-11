import {
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  forwardRef,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { BlockInserter } from './BlockInserter';

interface NewBlockPopoverProps {
  title?: string;
  quizId?: string;
  stepId?: string;
  triggerIcon?: boolean;
  btnText: string;
}

function NewBlockPopoverModal({ title, quizId, stepId, triggerIcon, btnText }: NewBlockPopoverProps) {
  const triggerBtnRef = useRef(null);

  // interface TriggerBtnProps {
  //   triggerIcon?: boolean;
  //   btnText: string;
  // }

  // const TriggerBtn = forwardRef((props: TriggerBtnProps, ref) => {
  //   return props.triggerIcon ? (
  //     <IconButton
  //       ref={ref}
  //       as="button"
  //       className="inserter-icon"
  //       isRound={true}
  //       colorScheme="teal"
  //       aria-label="insert new block"
  //       fontSize="12px"
  //       size="sm"
  //       icon={<AddIcon />}
  //     />
  //   ) : (
  //     <Button ref={ref} colorScheme="teal" aria-label="add block">
  //       {' '}
  //       {props.btnText}
  //     </Button>
  //   );
  // });

  return (
    <Popover>
      <PopoverTrigger>
        {/* <TriggerBtn ref={triggerBtnRef} btnText={btnText} triggerIcon={triggerIcon} /> */}

        {triggerIcon ? (
          <IconButton
            className="inserter-icon"
            isRound={true}
            colorScheme="teal"
            aria-label="insert new block"
            fontSize="12px"
            size="sm"
            icon={<AddIcon />}
          />
        ) : (
          <Button colorScheme="teal" aria-label="add block">
            {' '}
            Add Block
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{title ? title : 'Select block type:'}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <BlockInserter stepId={stepId ?? ''} quizId={quizId ?? ''} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default NewBlockPopoverModal;
