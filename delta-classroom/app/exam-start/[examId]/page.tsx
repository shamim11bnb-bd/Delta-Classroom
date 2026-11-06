import ExamInstructions from '@/clients/components/exams/ExamInstructions';

export default async function ExamStartPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <ExamInstructions examId={examId} />
    </div>
  );
}
