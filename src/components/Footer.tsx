export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Learning Management & Question Bank Platform. All rights reserved.</p>
        <p className="mt-1 text-xs text-slate-500">Built with Next.js, TypeScript, Tailwind CSS & Supabase</p>
      </div>
    </footer>
  );
}
