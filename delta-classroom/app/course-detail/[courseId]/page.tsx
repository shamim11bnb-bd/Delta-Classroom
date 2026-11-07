import Header from '@/clients/components/layout/Header';
import CourseDetails from '@/clients/components/courses/CourseDetails';

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <CourseDetails courseId={courseId} />
      </main>
    </div>
  );
}
