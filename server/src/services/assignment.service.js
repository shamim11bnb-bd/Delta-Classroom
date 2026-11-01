import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";
import { unwrap } from "../utils/asyncHandler.js";
import { assertCourseMember, assertCourseTeacher } from "./access.service.js";

export async function createAssignment(user, body) {
  await assertCourseTeacher(body.course_id, user);
  return unwrap(await supabase.from("assignments").insert(body).select().single());
}

export async function submit(user, assignmentId, body) {
  const { data: a } = await supabase.from("assignments").select("*").eq("id", assignmentId).maybeSingle();
  if (!a) throw new AppError("অ্যাসাইনমেন্ট পাওয়া যায়নি", 404);
  await assertCourseMember(a.course_id, user);
  if (a.due_at && new Date(a.due_at) < new Date()) throw new AppError("জমা দেওয়ার সময় শেষ", 400);
  return unwrap(
    await supabase
      .from("submissions")
      .upsert(
        { assignment_id: assignmentId, student_id: user.id, ...body, submitted_at: new Date().toISOString() },
        { onConflict: "assignment_id,student_id" }
      )
      .select()
      .single()
  );
}

export async function grade(user, submissionId, { marks, feedback }) {
  const { data: s } = await supabase
    .from("submissions").select("id, assignments(course_id, max_marks)").eq("id", submissionId).maybeSingle();
  if (!s) throw new AppError("সাবমিশন পাওয়া যায়নি", 404);
  await assertCourseTeacher(s.assignments.course_id, user);
  if (marks > s.assignments.max_marks) throw new AppError(`নম্বর ${s.assignments.max_marks}-এর বেশি হতে পারবে না`, 400);
  return unwrap(await supabase.from("submissions").update({ marks, feedback }).eq("id", submissionId).select().single());
}
