'use client';

import { useState } from 'react';
import { loginAction } from '@/server/actions/auth.actions';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await loginAction(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
      <h2 className="text-2xl font-bold text-center text-slate-800">Sign In</h2>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="student@example.com"
            className="w-full mt-1 p-3 border rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full mt-1 p-3 border rounded-xl"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
