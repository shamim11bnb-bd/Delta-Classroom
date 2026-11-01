import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  if (!token) throw new AppError("প্রথমে লগইন করুন", 401);

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) throw new AppError("সেশনের মেয়াদ শেষ, আবার লগইন করুন", 401);

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  if (!profile) throw new AppError("প্রোফাইল পাওয়া যায়নি", 403);

  req.user = { ...profile, email: data.user.email };
  next();
});

export const requireRole = (...roles) => (req, _res, next) =>
  roles.includes(req.user.role)
    ? next()
    : next(new AppError("এই কাজের অনুমতি আপনার নেই", 403));
