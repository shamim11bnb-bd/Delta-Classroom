export default function QuestionFilter() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
      <h3 className="font-bold text-slate-800">Filter Questions</h3>
      <div className="grid grid-cols-3 gap-4">
        <select className="p-2 border rounded-lg"><option>All Subjects</option></select>
        <select className="p-2 border rounded-lg"><option>Difficulty</option></select>
      </div>
    </div>
  );
}
