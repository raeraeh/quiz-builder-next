import { Button } from "@chakra-ui/react";
import { useTabsContext } from "./TabsContext";

export interface TabTitleProps {
  id: string;
  title: string;
}

function TabTitle({ id, title }: TabTitleProps) {
  const tabsContext = useTabsContext();
  return (
    <>
      <Button
        borderTopRadius="20px"
        borderBottomRadius={0}
        isActive={id === tabsContext?.selectedTab}
        onClick={() => tabsContext?.setSelectedTab(id)}
      >
        {title}
      </Button>
    </>
  );
}

export default TabTitle;
