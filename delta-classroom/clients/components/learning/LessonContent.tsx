export default function LessonContent({ lessonId }: { lessonId: string }) {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4">
      <h3 className="text-xl font-bold text-white">Lesson #{lessonId} Overview</h3>
      <p className="text-sm text-slate-300">Detailed notes, formula sheets, and code snippets accompanying this lecture.</p>
    </div>
  );
}
