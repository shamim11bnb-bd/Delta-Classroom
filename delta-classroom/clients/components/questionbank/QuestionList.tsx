export default function QuestionList() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-slate-800">All Bank Questions</h3>
      <div className="divide-y">
        <div className="py-3 flex justify-between">
          <p className="text-slate-800 font-medium">Evaluate integral of x^2 dx.</p>
          <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-md">Math</span>
        </div>
      </div>
    </div>
  );
}
