import type { Request, Response, NextFunction } from "express";
import { supabaseAuth, supabaseAdmin } from "../config/supabase";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return res.status(401).json({ error: "Authentication token required." });

    const { data: { user }, error } = await supabaseAuth.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: "Invalid or expired token." });

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles").select("role,is_active").eq("id", user.id).maybeSingle();
    if (profileError || !profile || !profile.is_active) {
      return res.status(403).json({ error: "User profile is inactive or unavailable." });
    }
    req.user = user;
    req.userRole = profile.role;
    next();
  } catch {
    return res.status(401).json({ error: "Could not verify authentication." });
  }
}
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.userRole !== "admin") return res.status(403).json({ error: "Admin access required." });
  next();
}
