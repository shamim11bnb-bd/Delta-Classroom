import type { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase";

export async function listCourses(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("courses")
    .select("id,title,slug,description,thumbnail_url,price,level,published,created_at")
    .eq("published", true).order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ courses: data });
}
export async function getCourse(req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("courses").select("*,lessons(id,title,description,position,duration_seconds,is_preview)")
    .eq("id", req.params.id).eq("published", true).order("position", { referencedTable: "lessons", ascending: true }).maybeSingle();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Course not found." });
  res.json({ course: data });
}
export async function createCourse(req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("courses").insert({ ...req.body, created_by: req.user!.id }).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ course: data });
}
export async function updateCourse(req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("courses").update(req.body).eq("id", req.params.id).select().maybeSingle();
  if (error) return res.status(400).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Course not found." });
  res.json({ course: data });
}
export async function deleteCourse(req: Request, res: Response) {
  const { error } = await supabaseAdmin.from("courses").delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
}
