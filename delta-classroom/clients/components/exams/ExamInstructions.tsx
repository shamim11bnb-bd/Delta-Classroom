import Link from 'next/link';

export default function ExamInstructions({ examId }: { examId: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full border border-slate-200 space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Exam Instructions (ID: {examId})</h2>
      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
        <li>Ensure a stable internet connection during the test.</li>
        <li>Timer starts immediately once you launch the test.</li>
        <li>Do not refresh or close the browser tab.</li>
      </ul>
      <Link href={`/exam-start/${examId}?active=true`} className="block text-center py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md">
        I Agree & Begin Exam
      </Link>
    </div>
  );
}
