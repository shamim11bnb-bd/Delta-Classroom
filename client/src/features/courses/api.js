import { api, unwrap } from "../../lib/api";
import { supabase } from "../../lib/supabaseClient";

const withTeacher = "*, teacher:profiles!teacher_id(full_name)";

// পড়া: সরাসরি Supabase (RLS সুরক্ষিত)
export async function listCourses({ search = "", limit } = {}) {
  let q = supabase.from("courses").select(withTeacher).eq("is_published", true).order("created_at", { ascending: false });
  if (search) q = q.ilike("title", `%${search}%`);
  if (limit) q = q.limit(limit);
  return unwrap(await q);
}

export const getCourse = async (id) => unwrap(await supabase.from("courses").select(withTeacher).eq("id", id).single());

export async function isEnrolled(courseId, userId) {
  if (!userId) return false;
  const { data } = await supabase.from("enrollments").select("id").eq("course_id", courseId).eq("student_id", userId).maybeSingle();
  return !!data;
}

export async function listEnrolledCourses(userId) {
  const rows = unwrap(await supabase.from("enrollments").select(`course:courses(${withTeacher})`).eq("student_id", userId));
  return rows.map((r) => r.course).filter(Boolean);
}

export const listTeachingCourses = async (userId) =>
  unwrap(await supabase.from("courses").select(withTeacher).eq("teacher_id", userId).order("created_at", { ascending: false }));

export const listStudents = async (courseId) =>
  unwrap(await supabase.from("enrollments").select("student:profiles!student_id(id, full_name)").eq("course_id", courseId)).then((rows) =>
    rows.map((r) => r.student)
  );

// লেখা: server API দিয়ে
export const createCourse = (body) => api.post("/courses", body).then((r) => r.data.data);
export const updateCourse = (id, body) => api.patch(`/courses/${id}`, body).then((r) => r.data.data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const enroll = (id) => api.post(`/courses/${id}/enroll`).then((r) => r.data.data);
