import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-10 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-400 sm:text-5xl">
          LMS ও কোশ্চেন ব্যাংক ম্যানেজমেন্ট সিস্টেম
        </h1>
        <p className="text-lg text-slate-300">
          আপনার সমস্ত অনলাইন কোর্স, পরীক্ষা এবং কোশ্চেন ব্যাংক পরিচালনার জন্য একটি আধুনিক ফুল-স্ট্যাক সমাধান।
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/course" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-white shadow-lg transition">
            সকল কোর্স দেখুন
          </Link>
          <Link href="/questionbank" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-semibold text-slate-200 transition">
            কোশ্চেন ব্যাংক
          </Link>
          <Link href="/admin" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold text-white shadow-lg transition">
            অ্যাডমিন ড্যাশবোর্ড
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xl font-bold text-indigo-400">কোর্স পোর্টাল</h3>
          <p className="text-slate-400 text-sm">অনলাইন ভিডিও টিউটোরিয়াল, লেসন ট্র্যাকিং ও এনরোলমেন্ট ব্যবস্থাপনা।</p>
          <Link href="/course" className="inline-block text-sm text-indigo-400 hover:underline pt-2">বিস্তারিত &rarr;</Link>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xl font-bold text-indigo-400">অনলাইন এক্সাম</h3>
          <p className="text-slate-400 text-sm">টাইমারযুক্ত পরীক্ষা, অটো-গ্রেডিং এবং মেধা তালিকা প্রকাশের সুবিধা।</p>
          <Link href="/exam/start" className="inline-block text-sm text-indigo-400 hover:underline pt-2">পরীক্ষায় অংশ নিন &rarr;</Link>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <h3 className="text-xl font-bold text-indigo-400">কোশ্চেন ব্যাংক</h3>
          <p className="text-slate-400 text-sm">বিষয়ভিত্তিক প্রশ্ন ফিল্টারিং, অটোমেটেড কোশ্চেন পেপার জেনারেশন।</p>
          <Link href="/questionbank" className="inline-block text-sm text-indigo-400 hover:underline pt-2">প্রশ্ন ব্যাংক খুলুন &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
