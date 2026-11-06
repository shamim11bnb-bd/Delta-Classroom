'use client';
import { useState, useEffect } from 'react';

export default function ExamTimer({ initialMinutes = 60 }: { initialMinutes?: number }) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="px-4 py-2 bg-slate-900 text-emerald-400 font-mono font-bold rounded-xl border border-slate-700">
      ⏱️ {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}
