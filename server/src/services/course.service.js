import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";
import { unwrap } from "../utils/asyncHandler.js";
import { assertCourseTeacher } from "./access.service.js";

export const createCourse = async (user, body) =>
  unwrap(await supabase.from("courses").insert({ ...body, teacher_id: user.id }).select().single());

export async function updateCourse(user, id, body) {
  await assertCourseTeacher(id, user);
  return unwrap(await supabase.from("courses").update(body).eq("id", id).select().single());
}

export async function deleteCourse(user, id) {
  await assertCourseTeacher(id, user);
  unwrap(await supabase.from("courses").delete().eq("id", id));
}

export async function enroll(user, courseId) {
  const { data: course } = await supabase.from("courses").select("id, is_published").eq("id", courseId).maybeSingle();
  if (!course || !course.is_published) throw new AppError("কোর্সটি পাওয়া যায়নি", 404);
  // পেমেন্ট থাকলে এখানে যাচাই করে তারপর enroll করুন
  return unwrap(
    await supabase.from("enrollments").insert({ course_id: courseId, student_id: user.id }).select().single()
  );
}

export async function addLesson(user, courseId, body) {
  await assertCourseTeacher(courseId, user);
  return unwrap(await supabase.from("lessons").insert({ ...body, course_id: courseId }).select().single());
}

export async function deleteLesson(user, lessonId) {
  const { data } = await supabase.from("lessons").select("course_id").eq("id", lessonId).maybeSingle();
  if (!data) throw new AppError("পাঠ পাওয়া যায়নি", 404);
  await assertCourseTeacher(data.course_id, user);
  unwrap(await supabase.from("lessons").delete().eq("id", lessonId));
}
