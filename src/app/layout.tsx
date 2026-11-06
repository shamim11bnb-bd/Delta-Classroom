import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'LMS & Question Bank Platform',
  description: 'Next.js + TypeScript + Supabase Learning & Exam Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
