import type { Request, Response } from "express";
import { supabaseAdmin } from "../config/supabase";
export async function adminStats(_req: Request, res: Response) {
  const tables = ["profiles", "courses", "enrollments", "exams", "exam_attempts"] as const;
  const counts = await Promise.all(tables.map(async table => {
    const { count, error } = await supabaseAdmin.from(table).select("*", { count: "exact", head: true });
    if (error) throw error;
    return [table, count || 0] as const;
  }));
  res.json({ stats: Object.fromEntries(counts) });
}
export async function adminUsers(_req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("profiles").select("id,full_name,email,phone,role,is_active,created_at").order("created_at", { ascending: false }).limit(200);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ users: data });
}
