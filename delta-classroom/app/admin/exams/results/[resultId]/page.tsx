export default function AdminResultDetailPage({ params }: { params: { resultId: string } }) {
  return <div className="p-6 bg-white rounded-2xl border">Result Detail #{params.resultId}</div>;
}
