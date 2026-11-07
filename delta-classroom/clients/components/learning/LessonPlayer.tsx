export default function LessonPlayer({ lessonId }: { lessonId: string }) {
  return (
    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
      <p className="text-slate-400 font-semibold">[ Video Player Stream for Lesson #{lessonId} ]</p>
    </div>
  );
}
