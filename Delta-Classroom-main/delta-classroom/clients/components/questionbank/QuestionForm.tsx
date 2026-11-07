export default function QuestionForm() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Add New Question</h2>
      <input type="text" placeholder="Question Title / Text" className="w-full p-3 border rounded-xl" />
      <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl">Save Question</button>
    </div>
  );
}
