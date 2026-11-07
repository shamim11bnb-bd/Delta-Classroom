import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-white border-b border-slate-200">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/mycourse">My Courses</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}
