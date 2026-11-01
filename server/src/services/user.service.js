import { supabase } from "../config/supabase.js";
import { unwrap } from "../utils/asyncHandler.js";

export const listUsers = async () =>
  unwrap(await supabase.from("profiles").select("*").order("created_at", { ascending: false }));

export const setRole = async (id, role) =>
  unwrap(await supabase.from("profiles").update({ role }).eq("id", id).select().single());

export async function stats() {
  const count = async (table) => {
    const { count: c, error } = await supabase.from(table).select("*", { count: "exact", head: true });
    if (error) throw error;
    return c;
  };
  const [users, courses, enrollments, submissions] = await Promise.all(
    ["profiles", "courses", "enrollments", "submissions"].map(count)
  );
  return { users, courses, enrollments, submissions };
}
