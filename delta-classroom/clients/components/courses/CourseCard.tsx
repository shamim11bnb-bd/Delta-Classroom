import Link from 'next/link';

export default function CourseCard({ course }: { course?: any }) {
  const title = course?.title || 'Higher Mathematics & Calculus';
  const id = course?.id || '1';
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-40 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold">
        Math 101
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">Master differentiation and integration with practice problems.</p>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xl font-extrabold text-slate-900">$49.99</span>
          <Link href={`/course-detail/${id}`} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg text-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
