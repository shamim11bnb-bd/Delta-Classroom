import ExamInstructions from '@/clients/components/exams/ExamInstructions';

export default function ExamStartPage({ params }: { params: { examId: string } }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <ExamInstructions examId={params.examId} />
    </div>
  );
}
