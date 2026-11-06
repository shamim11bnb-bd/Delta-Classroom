'use client';

import React from 'react';
import Link from 'next/link';

export default function ExamResultPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-indigo-400">পরীক্ষার রেজাল্ট কার্ড</h1>
        <p className="text-slate-400 text-sm mt-1">প্রাপ্ত নম্বর ও ভুল-সঠিক উত্তরের অ্যানালাইসিস।</p>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2 text-sm text-slate-300">
        <p className="font-semibold text-indigo-300">মূল PHP ফাইল রূপান্তর বিবরণ:</p>
        <p>অরিজিনাল পিএইচপি ফাইল: <code className="bg-slate-900 px-2 py-0.5 rounded text-amber-300">exam-result.php</code></p>
        <p>নেক্সট.জেএস রুট পাথ: <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-300">src/app/exam/result/page.tsx</code></p>
      </div>

      <div className="pt-2 flex flex-wrap gap-3">
        <Link href="/" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium text-white transition">
          হোম পেজ
        </Link>
        <Link href="/dashboard" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm font-medium text-slate-200 transition">
          ড্যাশবোর্ড
        </Link>
      </div>
    </div>
  );
}
