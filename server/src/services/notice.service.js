import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";
import { unwrap } from "../utils/asyncHandler.js";
import { assertCourseTeacher } from "./access.service.js";

export async function createNotice(user, { course_id, title, body }) {
  if (course_id) await assertCourseTeacher(course_id, user);
  else if (user.role !== "admin") throw new AppError("সবার জন্য নোটিশ শুধু admin দিতে পারেন", 403);

  return unwrap(
    await supabase.from("notices").insert({ course_id: course_id ?? null, author_id: user.id, title, body }).select().single()
  );
}

export async function deleteNotice(user, id) {
  const { data } = await supabase.from("notices").select("author_id").eq("id", id).maybeSingle();
  if (!data) throw new AppError("নোটিশ পাওয়া যায়নি", 404);
  if (user.role !== "admin" && data.author_id !== user.id) throw new AppError("অনুমতি নেই", 403);
  unwrap(await supabase.from("notices").delete().eq("id", id));
}
