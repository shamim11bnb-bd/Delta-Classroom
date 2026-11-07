'use client';

import { useState } from 'react';
import { loginAction } from '@/server/actions/auth.actions';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const res = await loginAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else if (res?.success && res?.redirectTo) {
      router.push(res.redirectTo);
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold text-center">Admin Portal Login</h2>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400">Admin Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-1 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login to Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
