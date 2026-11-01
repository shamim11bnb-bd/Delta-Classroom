import { api, unwrap } from "../../lib/api";
import { supabase } from "../../lib/supabaseClient";

export const listAttendanceByDate = async (courseId, date) =>
  unwrap(await supabase.from("attendance").select("student_id, status").eq("course_id", courseId).eq("class_date", date));

export const listMyAttendance = async (courseId, userId) =>
  unwrap(await supabase.from("attendance").select("*").eq("course_id", courseId).eq("student_id", userId).order("class_date", { ascending: false }));

export const markAttendance = (body) => api.post("/attendance", body).then((r) => r.data.data);
