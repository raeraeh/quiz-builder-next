import DataPreview from '@components/app/components/DataPreview';
import StepEditor from '@components/app/components/StepEditor/StepEditor';
import StepSettings from '@components/app/components/StepSettings';
import Tabs, { TabWithTitleProps } from '@components/app/components/Tabs/Tabs';
import { BlockSettings } from '@components/app/components/blocks/BlockSettings';
import { useParams } from 'next/navigation';

export default function Page() {
  // const tabsData: TabWithTitleProps[] = [
  //   {
  //     id: '1',
  //     title: 'Step Settings',
  //     component: () => <StepSettings stepId={stepId} quizId={quizId} />,
  //   },
  //   {
  //     id: '2',
  //     title: 'Block Settings',
  //     component: () => <BlockSettings stepId={stepId} />,
  //   },
  //   { id: '3', title: 'Data Preview', component: () => <DataPreview /> },
  // ];

  return (
    <>
      <StepEditor />
      {/* <div className="sidebar right-sidebar">
        <Tabs tabsData={tabsData} />
      </div> */}
    </>
  );
}
