import PaperView from '@/clients/components/questionbank/PaperView';

export default function PaperViewPage({ params }: { params: { paperId: string } }) {
  return <div className="p-6 max-w-7xl mx-auto"><PaperView paperId={params.paperId} /></div>;
}
