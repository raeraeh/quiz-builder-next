import TabContent from './Tabs/TabContent';
import StepSettings from './StepSettings';
import { BlockSettings } from './blocks/BlockSettings';
import Tabs from './Tabs/Tabs';
import Tab from './Tabs/Tab';
import { Divider, Flex } from '@chakra-ui/react';
import { Step } from '../../api/StepClient';
import DataPreview from './DataPreview';

interface EditSideBarProps {
  step?: Step | null;
  quizId: string;
}

export function EditSideBar({ step, quizId }: EditSideBarProps) {
  const tabsData = [
    {
      id: '1',
      title: 'Step Settings',
      component: () => <StepSettings step={step} quizId={quizId} />,
    },
    {
      id: '2',
      title: 'Block Settings',
      component: () => <BlockSettings stepId={step?.id ?? ''} />,
    },
    { id: '3', title: 'Data Preview', component: () => <DataPreview /> },
  ];

  return (
    <div className="sidebar right-sidebar">
      <Tabs>
        <Flex gap={3}>
          {tabsData.map(({ id, title }) => (
            <>
              <Tab key={id} id={id}>
                {title}
              </Tab>
            </>
          ))}
        </Flex>
        <Divider className="tabs-divider" orientation="horizontal" />

        <div className="tabs-content">
          {tabsData.map(({ id, component: TabComponent }) => (
            <>
              <TabContent id={id}>
                <TabComponent />
              </TabContent>
            </>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

export default EditSideBar;
