'use client';
import { FunctionComponent } from 'react';
import { useTabsContext } from './TabsContext';
import { Box, Button } from '@chakra-ui/react';

export interface TabProps {
  id: string;
  TabComponent?: FunctionComponent<TabComponentProps>;
  children?: React.ReactNode;
}

interface TabComponentProps {
  id: string;
  isSelected?: boolean;
  onChange: ((newId: string) => void) | undefined;
  children?: React.ReactNode;
}

const DefaultTab = ({ onChange, id, isSelected, children }: TabComponentProps) => {
  const handleClick = (newId: string): void => {
    if (onChange) {
      onChange(newId);
    }
  };

  return (
    <Box as="button" className={`tab-button ${isSelected ? 'tab-button-selected' : ''}`} onClick={() => handleClick(id)}>
      {children}
    </Box>
  );
};

function Tab({ id, children, TabComponent = DefaultTab }: TabProps) {
  const tabContext = useTabsContext();
  const isSelected = tabContext?.selectedTab === id;

  return (
    <TabComponent id={id} isSelected={isSelected} onChange={tabContext?.setSelectedTab}>
      {children}
    </TabComponent>
  );
}

export default Tab;
