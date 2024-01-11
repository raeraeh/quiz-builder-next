import { TabsProvider } from './TabsContext';

interface TabsProps {
  children?: React.ReactNode;
}

function Tabs({ children }: TabsProps) {
  return <TabsProvider>{children}</TabsProvider>;
}

export default Tabs;
