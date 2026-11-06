import Link from 'next/link';

export default function CourseDetails({ courseId }: { courseId: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-800">Course #{courseId}: Advanced Mathematics</h1>
      <p className="text-slate-600">This comprehensive course covers all core concepts required for competitive examinations.</p>
      <Link href={`/enroll/${courseId}`} className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md">
        Enroll Now
      </Link>
    </div>
  );
}
