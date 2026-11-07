import Link from 'next/link';

export default function ExamCard({ exam }: { exam: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-slate-800">{exam.title}</h3>
      <div className="text-sm text-slate-500 space-y-1">
        <p>Duration: {exam.durationMinutes} minutes</p>
        <p>Total Marks: {exam.totalMarks}</p>
      </div>
      <Link href={`/exam-start/${exam.id}`} className="block text-center py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700">
        Start Exam
      </Link>
    </div>
  );
}
