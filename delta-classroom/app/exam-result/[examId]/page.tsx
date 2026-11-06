import ExamResult from '@/clients/components/exams/ExamResult';

export default async function ExamResultPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
      <ExamResult examId={examId} />
    </div>
  );
}
