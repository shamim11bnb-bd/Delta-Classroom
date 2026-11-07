import Header from '@/clients/components/layout/Header';
import LessonPlayer from '@/clients/components/learning/LessonPlayer';
import LessonContent from '@/clients/components/learning/LessonContent';

export default async function LessonWatchPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LessonPlayer lessonId={lessonId} />
        </div>
        <div>
          <LessonContent lessonId={lessonId} />
        </div>
      </main>
    </div>
  );
}
