import Header from '@/clients/components/layout/Header';

export default function GeneralResultPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-800">My Exam History & Results</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <p className="text-slate-600">Select an exam from your completed tests to view detailed performance metrics.</p>
        </div>
      </main>
    </div>
  );
}
