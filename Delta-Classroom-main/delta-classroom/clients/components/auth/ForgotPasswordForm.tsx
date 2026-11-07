'use client';

export default function ForgotPasswordForm() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">Forgot Password</h2>
      <form className="mt-4 space-y-4">
        <input type="email" placeholder="Enter your email" className="w-full p-3 border rounded-xl" required />
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">Send Reset Link</button>
      </form>
    </div>
  );
}
