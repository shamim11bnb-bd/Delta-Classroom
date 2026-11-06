import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 space-y-2">
      <Link href="/admin/dashboard" className="block p-3 rounded-lg hover:bg-slate-800 font-semibold">Dashboard</Link>
      <Link href="/admin/users" className="block p-3 rounded-lg hover:bg-slate-800 font-semibold">Users</Link>
      <Link href="/admin/courses" className="block p-3 rounded-lg hover:bg-slate-800 font-semibold">Courses</Link>
      <Link href="/admin/exams" className="block p-3 rounded-lg hover:bg-slate-800 font-semibold">Exams</Link>
      <Link href="/admin/payments" className="block p-3 rounded-lg hover:bg-slate-800 font-semibold">Payments</Link>
    </aside>
  );
}
