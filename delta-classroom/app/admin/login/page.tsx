export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-2xl font-bold text-center">Admin Portal Login</h2>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400">Admin Email</label>
            <input type="email" className="w-full mt-1 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400">Password</label>
            <input type="password" className="w-full mt-1 px-4 py-2 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition">Login to Portal</button>
        </form>
      </div>
    </div>
  );
}
