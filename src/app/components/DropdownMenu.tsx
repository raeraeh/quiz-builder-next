'use client';
import { HamburgerIcon } from '@chakra-ui/icons';
import { MenuButton, Button, MenuList, MenuItem, Menu, useMediaQuery, IconButton } from '@chakra-ui/react';
import React from 'react';

interface DropdownMenuProps {
  children?: React.ReactNode;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');
  return (
    <Menu>
      <MenuButton as={IconButton} aria-label="options" colorScheme="teal" icon={<HamburgerIcon />}></MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
}

export default DropdownMenu;
