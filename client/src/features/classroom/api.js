import { api, unwrap } from "../../lib/api";
import { supabase } from "../../lib/supabaseClient";

export const listLessons = async (courseId) =>
  unwrap(await supabase.from("lessons").select("*").eq("course_id", courseId).order("position").order("created_at"));

export const addLesson = (courseId, body) => api.post(`/courses/${courseId}/lessons`, body).then((r) => r.data.data);
export const deleteLesson = (courseId, lessonId) => api.delete(`/courses/${courseId}/lessons/${lessonId}`);
