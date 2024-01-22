'use client';
import QuizPreview from '@components/app/components/QuizPreview';
import QuizSettings from '@components/app/components/QuizSettings';
import Tabs, { TabWithTitleProps } from '@components/app/components/Tabs/Tabs';

export default function Page({ params }: { params: { quizId: string } }) {
  const { quizId } = params;

  const tabsData: TabWithTitleProps[] = [{ id: '1', title: 'Quiz Settings', component: () => <QuizSettings quizId={quizId} /> }];

  return (
    <>
      <QuizPreview quizId={quizId} />

      <div className="sidebar right-sidebar">
        <Tabs tabsData={tabsData} />
      </div>
    </>
  );
}
