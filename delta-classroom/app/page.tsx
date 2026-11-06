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
              Delta Classroom brings courses, real-time online exams, question bank builders, and automated result generation under one roof.
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
      </main>
      <Footer />
    </div>
  );
}
