'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong!</h2>
        <p className="mt-2 text-sm text-slate-600">{error.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
