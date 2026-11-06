import Link from 'next/link';

export default async function ExamCompletePage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Exam Submitted!</h2>
        <p className="text-slate-500 mt-2">Your answers for Exam #{examId} have been recorded.</p>
        <Link href={`/exam-result/${examId}`} className="mt-6 inline-block w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md">
          View Result
        </Link>
      </div>
    </div>
  );
}
