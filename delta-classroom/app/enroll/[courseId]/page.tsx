import Header from '@/clients/components/layout/Header';
import EnrollmentForm from '@/clients/components/courses/EnrollmentForm';

export default async function EnrollPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto p-6">
        <EnrollmentForm courseId={courseId} />
      </main>
    </div>
  );
}
