import { Divider, Flex } from '@chakra-ui/react';
import Tab, { TabProps } from './Tab';
import { TabsProvider } from './TabsContext';
import TabContent from './TabContent';

export interface TabWithTitleProps extends TabProps {
  title: string;
  component: () => JSX.Element; // Define the component property
}

type TabsProps =
  | {
      children?: React.ReactNode;
    }
  | {
      tabsData?: TabWithTitleProps[];
    }
  | {
      noTabsProvider?: boolean;
    };

function TabsDataRenderer(props: TabsProps) {
  if ('tabsData' in props) {
    return (
      <>
        <Flex gap={3}>
          {props.tabsData?.map(({ id, title }) => (
            <Tab key={id} id={id}>
              {title}
            </Tab>
          ))}
        </Flex>
        <Divider className="tabs-divider" orientation="horizontal" />

        <div className="tabs-content">
          {props.tabsData?.map(({ id, component: TabComponent }) => (
            <TabContent key={id} id={id}>
              <TabComponent />
            </TabContent>
          ))}
        </div>
      </>
    );
  }

  return 'children' in props && props.children;
}

function Tabs(props: TabsProps) {
  const isTabsProviderDisabled = 'noTabsProvider' in props && props.noTabsProvider;

  return (
    <>
      {isTabsProviderDisabled ? (
        <TabsDataRenderer {...props} />
      ) : (
        <TabsProvider>
          <TabsDataRenderer {...props} />
        </TabsProvider>
      )}
    </>
  );
}

export default Tabs;
