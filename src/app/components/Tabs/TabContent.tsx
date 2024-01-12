import { ReactNode } from 'react';

import { useTabsContext } from './TabsContext';

interface TabContentProps {
  id: string;
  children?: ReactNode | ReactNode[];
}

export function TabContent({ id, children }: TabContentProps) {
  const tabContext = useTabsContext();
  console.log('selected tab', tabContext?.selectedTab);
  return tabContext?.selectedTab === id ? <>{children}</> : <></>;
}

export default TabContent;
