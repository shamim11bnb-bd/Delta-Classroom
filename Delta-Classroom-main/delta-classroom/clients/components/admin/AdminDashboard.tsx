export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-800">Admin Control Panel</h1>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs text-slate-500 font-bold uppercase">Students</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-2">1,420</p>
        </div>
      </div>
    </div>
  );
}
