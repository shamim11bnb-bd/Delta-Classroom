import Header from '@/clients/components/layout/Header';

export default function NoticePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-800">Notice Board</h1>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Important</span>
            <h3 className="text-xl font-bold text-slate-800 mt-2">Upcoming System Maintenance</h3>
            <p className="text-slate-600 mt-1 text-sm">Scheduled database update on Sunday 2:00 AM UTC.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
