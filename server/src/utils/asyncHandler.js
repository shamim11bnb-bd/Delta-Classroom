export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Supabase-এর { data, error } থেকে error থাকলে throw করে
export function unwrap({ data, error }) {
  if (error) throw error;
  return data;
}
