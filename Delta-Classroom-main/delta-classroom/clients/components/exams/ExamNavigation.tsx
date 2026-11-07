export default function ExamNavigation() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
      <button className="px-4 py-2 bg-slate-200 rounded-lg text-sm font-semibold">Previous</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Next</button>
    </div>
  );
}
