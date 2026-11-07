import Header from '@/clients/components/layout/Header';
import ExamCard from '@/clients/components/exams/ExamCard';

export default function ExamPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-800">Online Examinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExamCard exam={{ id: '1', title: 'Mathematics Midterm 2026', durationMinutes: 60, totalMarks: 100 }} />
          <ExamCard exam={{ id: '2', title: 'Physics Final Test', durationMinutes: 90, totalMarks: 150 }} />
        </div>
      </main>
    </div>
  );
}
