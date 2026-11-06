export default function AdminChangePasswordPage() {
  return (
    <div className="p-6 max-w-md bg-white rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">Change Admin Password</h2>
      <form className="mt-4 space-y-4">
        <input type="password" placeholder="Current Password" className="w-full p-2.5 border rounded-lg" />
        <input type="password" placeholder="New Password" className="w-full p-2.5 border rounded-lg" />
        <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold">Update</button>
      </form>
    </div>
  );
}
