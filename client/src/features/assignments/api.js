import { api, unwrap } from "../../lib/api";
import { supabase } from "../../lib/supabaseClient";

export const listAssignments = async (courseId) =>
  unwrap(await supabase.from("assignments").select("*").eq("course_id", courseId).order("created_at", { ascending: false }));

export const listMySubmissions = async (userId) =>
  unwrap(await supabase.from("submissions").select("*").eq("student_id", userId));

export const listSubmissions = async (assignmentId) =>
  unwrap(
    await supabase.from("submissions").select("*, student:profiles!student_id(full_name)").eq("assignment_id", assignmentId).order("submitted_at")
  );

export const createAssignment = (body) => api.post("/assignments", body).then((r) => r.data.data);
export const submitAssignment = (id, body) => api.post(`/assignments/${id}/submit`, body).then((r) => r.data.data);
export const gradeSubmission = (id, body) => api.patch(`/assignments/submissions/${id}/grade`, body).then((r) => r.data.data);
