import type { Request, Response } from "express";
import { supabaseAuth, supabaseAdmin } from "../config/supabase";

export async function register(req: Request, res: Response) {
  const { full_name, email, password, phone } = req.body;
  const { data, error } = await supabaseAuth.auth.signUp({
    email, password,
    options: { data: { full_name, phone: phone || null } }
  });
  if (error) return res.status(400).json({ error: error.message });
  if (data.user) {
    // The SQL trigger creates the profile row. This update only fills optional metadata.
    await supabaseAdmin.from("profiles").update({ full_name, phone: phone || null }).eq("id", data.user.id);
  }
  res.status(201).json({ message: "Registration submitted. Verify your email if confirmation is enabled.", user: data.user, session: data.session });
}
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
  if (error || !data.session) return res.status(401).json({ error: error?.message || "Login failed." });
  res.json({ user: data.user, session: data.session });
}
export async function me(req: Request, res: Response) {
  const { data, error } = await supabaseAdmin.from("profiles").select("*").eq("id", req.user!.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json({ profile: data });
}
export async function logout(_req: Request, res: Response) {
  // Supabase access tokens are stateless on the API; client should discard its session.
  res.json({ message: "Signed out. Clear the Supabase session in the client." });
}

export async function forgotPassword(req: Request, res: Response) {
  const email = String(req.body.email || "").trim().toLowerCase();
  // Supabase deliberately returns a generic response to avoid account enumeration.
  const { error } = await supabaseAuth.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.PASSWORD_RESET_REDIRECT_URL || undefined
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "If the account exists, password reset instructions have been sent." });
}
