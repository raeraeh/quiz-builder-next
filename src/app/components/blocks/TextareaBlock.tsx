// import React from "react";

import { Box, Flex, Spacer, Textarea } from '@chakra-ui/react';

interface TextareaBlockProps {
  label: string;
  placeholder: string;
  field: string;
}

export const TextareaBlock = ({ label, placeholder }: TextareaBlockProps): JSX.Element => {
  return (
    <Flex alignItems="center" justify="space-between" p={2}>
      {label ? <label>{label}</label> : <Spacer />}

      <Textarea variant="filled" colorScheme="red" value="" placeholder={placeholder}></Textarea>
    </Flex>
  );
};
