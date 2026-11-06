import Header from '@/clients/components/layout/Header';
import DashboardStats from '@/clients/components/dashboard/DashboardStats';
import DashboardContent from '@/clients/components/dashboard/DashboardContent';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-800">Student Dashboard</h1>
        <DashboardStats />
        <DashboardContent />
      </main>
    </div>
  );
}
