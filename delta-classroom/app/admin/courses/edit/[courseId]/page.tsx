export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div className="p-6 max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">Edit Course #{params.courseId}</h2>
      <form className="mt-4 space-y-4">
        <input type="text" defaultValue="Existing Course" className="w-full p-2.5 border rounded-lg" />
        <button type="submit" className="py-2.5 px-6 bg-blue-600 text-white rounded-lg font-bold">Update Course</button>
      </form>
    </div>
  );
}
