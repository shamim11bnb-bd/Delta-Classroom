import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";
import { unwrap } from "../utils/asyncHandler.js";
import { assertCourseTeacher } from "./access.service.js";

export async function mark(user, { course_id, class_date, records }) {
  await assertCourseTeacher(course_id, user);
  const enrolled = unwrap(await supabase.from("enrollments").select("student_id").eq("course_id", course_id));
  const ids = new Set(enrolled.map((e) => e.student_id));
  if (records.some((r) => !ids.has(r.student_id))) throw new AppError("তালিকায় কোর্সে ভর্তি নয় এমন শিক্ষার্থী আছে", 400);

  const rows = records.map((r) => ({ course_id, class_date, student_id: r.student_id, status: r.status }));
  unwrap(await supabase.from("attendance").upsert(rows, { onConflict: "course_id,student_id,class_date" }));
  return { saved: rows.length };
}
