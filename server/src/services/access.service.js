import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";

// কোর্সের শিক্ষক (বা admin) কি না
export async function assertCourseTeacher(courseId, user) {
  const { data } = await supabase.from("courses").select("id, teacher_id").eq("id", courseId).maybeSingle();
  if (!data) throw new AppError("কোর্স পাওয়া যায়নি", 404);
  if (user.role !== "admin" && data.teacher_id !== user.id) {
    throw new AppError("এই কোর্স আপনার নয়", 403);
  }
  return data;
}

// কোর্সে ভর্তি (বা শিক্ষক/admin) কি না
export async function assertCourseMember(courseId, user) {
  if (user.role === "admin") return;
  const { data: course } = await supabase.from("courses").select("teacher_id").eq("id", courseId).maybeSingle();
  if (!course) throw new AppError("কোর্স পাওয়া যায়নি", 404);
  if (course.teacher_id === user.id) return;
  const { data } = await supabase
    .from("enrollments").select("id").eq("course_id", courseId).eq("student_id", user.id).maybeSingle();
  if (!data) throw new AppError("আগে কোর্সে ভর্তি হন", 403);
}
