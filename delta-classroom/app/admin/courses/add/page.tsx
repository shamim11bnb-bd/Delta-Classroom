export default function AddCoursePage() {
  return (
    <div className="p-6 max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">Add New Course</h2>
      <form className="mt-4 space-y-4">
        <input type="text" placeholder="Course Title" className="w-full p-2.5 border rounded-lg" />
        <textarea placeholder="Description" className="w-full p-2.5 border rounded-lg h-32"></textarea>
        <button type="submit" className="py-2.5 px-6 bg-blue-600 text-white rounded-lg font-bold">Save Course</button>
      </form>
    </div>
  );
}
