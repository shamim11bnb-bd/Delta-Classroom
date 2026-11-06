import QuestionEditor from '@/clients/components/questionbank/QuestionEditor';

export default function EditQuestionPage({ params }: { params: { questionId: string } }) {
  return <div className="p-6 max-w-4xl mx-auto"><QuestionEditor questionId={params.questionId} /></div>;
}
