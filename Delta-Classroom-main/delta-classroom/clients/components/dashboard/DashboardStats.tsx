export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-semibold text-slate-500 uppercase">Enrolled Courses</h4>
        <p className="text-3xl font-extrabold text-slate-800 mt-2">3</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-semibold text-slate-500 uppercase">Exams Attended</h4>
        <p className="text-3xl font-extrabold text-slate-800 mt-2">8</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="text-xs font-semibold text-slate-500 uppercase">Average Score</h4>
        <p className="text-3xl font-extrabold text-blue-600 mt-2">92%</p>
      </div>
    </div>
  );
}
