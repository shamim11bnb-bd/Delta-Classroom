import PaperView from '@/clients/components/questionbank/PaperView';

export default async function PaperViewPage({ params }: { params: Promise<{ paperId: string }> }) {
  const { paperId } = await params;
  return <div className="p-6 max-w-7xl mx-auto"><PaperView paperId={paperId} /></div>;
}
