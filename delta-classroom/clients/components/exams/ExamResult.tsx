export default function ExamResult({ examId }: { examId: string }) {
  return (
    <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center space-y-6">
      <h2 className="text-3xl font-extrabold text-slate-800">Exam Result #{examId}</h2>
      <div className="text-5xl font-extrabold text-blue-600">88 / 100</div>
      <p className="text-slate-500 font-semibold">Status: <span className="text-emerald-600">PASSED</span></p>
    </div>
  );
}
