export default async function EditExamPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  return (
    <div className="p-6 max-w-2xl bg-white rounded-2xl border border-slate-200">
      <h2 className="text-xl font-bold">Edit Exam #{examId}</h2>
    </div>
  );
}
