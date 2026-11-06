'use client';

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <h2 className="text-2xl font-bold text-center text-slate-800">Register Account</h2>
      <form className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600">Full Name</label>
          <input type="text" placeholder="John Doe" className="w-full mt-1 p-3 border rounded-xl" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600">Email</label>
          <input type="email" placeholder="student@example.com" className="w-full mt-1 p-3 border rounded-xl" required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600">Password</label>
          <input type="password" placeholder="••••••••" className="w-full mt-1 p-3 border rounded-xl" required />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700">Create Account</button>
      </form>
    </div>
  );
}
