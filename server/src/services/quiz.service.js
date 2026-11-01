import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";
import { unwrap } from "../utils/asyncHandler.js";
import { assertCourseMember, assertCourseTeacher } from "./access.service.js";

export async function createQuiz(user, { questions, ...quiz }) {
  await assertCourseTeacher(quiz.course_id, user);
  for (const q of questions) {
    if (q.correct_index >= q.options.length) throw new AppError("সঠিক উত্তরের ক্রম ভুল", 422);
  }
  const created = unwrap(await supabase.from("quizzes").insert(quiz).select().single());

  const rows = unwrap(
    await supabase
      .from("quiz_questions")
      .insert(questions.map((q, i) => ({ quiz_id: created.id, question: q.question, options: q.options, position: i })))
      .select("id, position")
  );
  const answers = rows.map((r) => ({ question_id: r.id, correct_index: questions[r.position].correct_index }));
  unwrap(await supabase.from("quiz_answers").insert(answers));
  return created;
}

export async function submitQuiz(user, quizId, answers) {
  const { data: quiz } = await supabase.from("quizzes").select("id, course_id").eq("id", quizId).maybeSingle();
  if (!quiz) throw new AppError("কুইজ পাওয়া যায়নি", 404);
  await assertCourseMember(quiz.course_id, user);

  const questions = unwrap(await supabase.from("quiz_questions").select("id").eq("quiz_id", quizId));
  const keys = unwrap(
    await supabase.from("quiz_answers").select("question_id, correct_index").in("question_id", questions.map((q) => q.id))
  );
  const score = keys.filter((k) => answers[k.question_id] === k.correct_index).length;

  const attempt = unwrap(
    await supabase
      .from("quiz_attempts")
      .insert({ quiz_id: quizId, student_id: user.id, score, total: questions.length })
      .select()
      .single()
  );
  return attempt;
}
