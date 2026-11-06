export default function EditExamPage({ params }: { params: { examId: string } }) {
  return (
    <div className="p-6 max-w-2xl bg-white rounded-2xl border border-slate-200">
      <h2 className="text-xl font-bold">Edit Exam #{params.examId}</h2>
    </div>
  );
}
