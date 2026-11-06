'use client';

export default function VerifyOtpForm() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">Verify OTP</h2>
      <form className="mt-4 space-y-4">
        <input type="text" placeholder="6-digit OTP" className="w-full p-3 border rounded-xl text-center text-2xl tracking-widest" required />
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Verify Code</button>
      </form>
    </div>
  );
}
