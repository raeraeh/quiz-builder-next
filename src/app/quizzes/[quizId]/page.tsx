import QuizEditor from '@components/app/components/QuizEditor';

export default function Page({ params }: { params: { slug: string } }) {
  return <QuizEditor />;
}
