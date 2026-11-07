export default function Alert({ message }: { message: string }) {
  return <div className="p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl">{message}</div>;
}
