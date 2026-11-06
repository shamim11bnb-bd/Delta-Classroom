import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-extrabold text-blue-600">Delta Classroom</Link>
      <nav className="flex gap-6 text-sm font-semibold text-slate-600">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link href="/course" className="hover:text-blue-600">Courses</Link>
        <Link href="/exam" className="hover:text-blue-600">Exams</Link>
        <Link href="/questionbank" className="hover:text-blue-600">Question Bank</Link>
        <Link href="/notice" className="hover:text-blue-600">Notices</Link>
      </nav>
      <div className="flex gap-3">
        <Link href="/login" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100">Login</Link>
        <Link href="/register" className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700">Register</Link>
      </div>
    </header>
  );
}
