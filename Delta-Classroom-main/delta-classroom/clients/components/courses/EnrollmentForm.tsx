'use client';

export default function EnrollmentForm({ courseId }: { courseId: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Complete Enrollment for Course #{courseId}</h2>
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase">Payment Method</label>
        <select className="w-full mt-1 p-3 border rounded-xl">
          <option>Credit / Debit Card</option>
          <option>bKash / Mobile Banking</option>
        </select>
      </div>
      <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Confirm & Pay</button>
    </div>
  );
}
