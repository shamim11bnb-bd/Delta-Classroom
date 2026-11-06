export default function Pagination() {
  return (
    <div className="flex gap-2">
      <button className="px-3 py-1 border rounded">Prev</button>
      <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
      <button className="px-3 py-1 border rounded">Next</button>
    </div>
  );
}
