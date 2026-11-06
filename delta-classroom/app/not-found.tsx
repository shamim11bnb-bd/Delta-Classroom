import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">Page Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700 transition">
          Return Home
        </Link>
      </div>
    </div>
  );
}
