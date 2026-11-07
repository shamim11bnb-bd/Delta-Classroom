export default function ExamQuestion({ index, question }: { index: number; question: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
      <h4 className="font-bold text-slate-800">Q{index}: {question?.text || 'What is the derivative of sin(x)?'}</h4>
      <div className="space-y-2">
        {['cos(x)', '-cos(x)', 'tan(x)', 'sec(x)'].map((opt, i) => (
          <label key={i} className="flex items-center gap-3 p-3 border rounded-xl hover:bg-slate-50 cursor-pointer">
            <input type="radio" name={`q_${index}`} />
            <span className="text-sm font-medium text-slate-700">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
