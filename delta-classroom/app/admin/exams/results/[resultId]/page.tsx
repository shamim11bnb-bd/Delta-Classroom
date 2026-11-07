export default async function AdminResultDetailPage({ params }: { params: Promise<{ resultId: string }> }) {
  const { resultId } = await params;
  return <div className="p-6 bg-white rounded-2xl border">Result Detail #{resultId}</div>;
}
