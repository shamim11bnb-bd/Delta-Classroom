import { api, unwrap } from "../../lib/api";
import { supabase } from "../../lib/supabaseClient";

export const listQuizzes = async (courseId) =>
  unwrap(await supabase.from("quizzes").select("*").eq("course_id", courseId).order("created_at", { ascending: false }));

export const listQuestions = async (quizId) =>
  unwrap(await supabase.from("quiz_questions").select("id, question, options, position").eq("quiz_id", quizId).order("position"));

export const listMyAttempts = async (userId) => unwrap(await supabase.from("quiz_attempts").select("*").eq("student_id", userId));

export const listAttempts = async (quizId) =>
  unwrap(await supabase.from("quiz_attempts").select("*, student:profiles!student_id(full_name)").eq("quiz_id", quizId));

export const createQuiz = (body) => api.post("/quizzes", body).then((r) => r.data.data);
export const submitQuiz = (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }).then((r) => r.data.data);
