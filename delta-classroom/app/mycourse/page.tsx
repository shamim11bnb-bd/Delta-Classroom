import Header from '@/clients/components/layout/Header';
import CourseList from '@/clients/components/courses/CourseList';

export default function MyCoursePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-800">My Enrolled Courses</h1>
        <CourseList enrolledOnly={true} />
      </main>
    </div>
  );
}
