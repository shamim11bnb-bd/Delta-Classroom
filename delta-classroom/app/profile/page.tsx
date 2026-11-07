import Header from '@/clients/components/layout/Header';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-800">My Profile</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Full Name</label>
            <p className="text-lg font-bold text-slate-800">John Student</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase">Email</label>
            <p className="text-lg font-bold text-slate-800">student@example.com</p>
          </div>
        </div>
      </main>
    </div>
  );
}
