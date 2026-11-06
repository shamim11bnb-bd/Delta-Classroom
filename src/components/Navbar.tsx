import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-slate-100 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition">
            LMS & Exam System
          </Link>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
            <Link href="/course" className="hover:text-indigo-400 transition">Courses</Link>
            <Link href="/questionbank" className="hover:text-indigo-400 transition">Question Bank</Link>
            <Link href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</Link>
            <Link href="/notice" className="hover:text-indigo-400 transition">Notice</Link>
            <Link href="/admin" className="bg-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-500 text-white transition">Admin</Link>
            <Link href="/login" className="border border-indigo-500 text-indigo-400 px-3 py-1.5 rounded hover:bg-indigo-950 transition">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
