import QuestionEditor from '@/clients/components/questionbank/QuestionEditor';

export default async function EditQuestionPage({ params }: { params: Promise<{ questionId: string }> }) {
  const { questionId } = await params;
  return <div className="p-6 max-w-4xl mx-auto"><QuestionEditor questionId={questionId} /></div>;
}
