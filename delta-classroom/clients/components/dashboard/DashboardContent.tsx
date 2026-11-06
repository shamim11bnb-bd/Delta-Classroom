export default function DashboardContent() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Learning Progress</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="font-semibold text-slate-800">Advanced Mathematics 101</p>
            <p className="text-xs text-slate-500">Lesson 4: Integration Techniques</p>
          </div>
          <span className="text-sm font-bold text-emerald-600">80% Complete</span>
        </div>
      </div>
    </div>
  );
}
