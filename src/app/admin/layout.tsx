import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-4 shrink-0">
        <h2 className="text-lg font-bold text-indigo-400 px-3 py-1 border-b border-slate-800">অ্যাডমিন প্যানেল</h2>
        <nav className="flex flex-col space-y-1 text-sm text-slate-300">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded hover:bg-slate-800 transition">ড্যাশবোর্ড</Link>
          <Link href="/admin/courses" className="px-3 py-2 rounded hover:bg-slate-800 transition">কোর্সসমূহ</Link>
          <Link href="/admin/exams" className="px-3 py-2 rounded hover:bg-slate-800 transition">অনলাইন পরীক্ষা</Link>
          <Link href="/admin/users" className="px-3 py-2 rounded hover:bg-slate-800 transition">ইউজারবৃন্দ</Link>
          <Link href="/admin/payments" className="px-3 py-2 rounded hover:bg-slate-800 transition">পেমেন্টসমূহ</Link>
          <Link href="/admin/notices" className="px-3 py-2 rounded hover:bg-slate-800 transition">নোটিশ</Link>
          <Link href="/admin/banner" className="px-3 py-2 rounded hover:bg-slate-800 transition">ব্যানার সেটিংস</Link>
          <Link href="/questionbank/admin/dashboard" className="px-3 py-2 rounded hover:bg-slate-800 text-indigo-400 font-medium transition">কোশ্চেন ব্যাংক Admin</Link>
        </nav>
      </aside>
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
