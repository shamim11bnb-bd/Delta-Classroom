import Link from 'next/link';
import Header from '@/clients/components/layout/Header';
import Footer from '@/clients/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 py-24 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1.5 text-xs font-semibold text-blue-300 border border-blue-400/30">
              Complete LMS & Exam Solutions
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Elevate Learning & Master Examinations
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-blue-100">
              Delta Classroom brings courses, real-time online exams, question bank builders, and automated result generation under one powerful roof.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/register" className="rounded-xl bg-white px-8 py-3.5 font-bold text-blue-700 shadow-lg hover:bg-blue-50 transition">
                Get Started Free
              </Link>
              <Link href="/course" className="rounded-xl border border-blue-400/40 bg-blue-600/30 px-8 py-3.5 font-bold text-white shadow-lg hover:bg-blue-600/50 transition">
                Browse Courses
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-800">Core Features</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">📚</div>
              <h3 className="mt-4 text-xl font-bold text-slate-800">Interactive Courses</h3>
              <p className="mt-2 text-sm text-slate-600">High-quality video lessons, module tracking, and downloadable study materials.</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">📝</div>
              <h3 className="mt-4 text-xl font-bold text-slate-800">Live Exam Engine</h3>
              <p className="mt-2 text-sm text-slate-600">Timed assessments, negative marking, instant grading, and rank card generation.</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
              <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">⚡</div>
              <h3 className="mt-4 text-xl font-bold text-slate-800">Question Bank</h3>
              <p className="mt-2 text-sm text-slate-600">Subject-wise categorisation, paper builder, CSV bulk upload, and statistics.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
