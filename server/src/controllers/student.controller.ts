import type { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase";
export async function myCourses(req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("enrollments")
    .select("id,status,progress_percent,enrolled_at,courses(id,title,description,thumbnail_url,level)")
    .eq("student_id", req.user!.id).order("enrolled_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ enrollments: data });
}
export async function enroll(req: Request, res: Response) {
  const { data: course } = await supabaseAdmin.from("courses").select("id,published").eq("id", req.params.courseId).maybeSingle();
  if (!course || !course.published) return res.status(404).json({ error: "Published course not found." });
  const { data, error } = await supabaseAdmin.from("enrollments")
    .upsert({ student_id: req.user!.id, course_id: req.params.courseId }, { onConflict: "student_id,course_id" }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ enrollment: data });
}
export async function listNotices(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("notices").select("id,title,body,type,published_at")
    .eq("is_published", true).order("published_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ notices: data });
}
