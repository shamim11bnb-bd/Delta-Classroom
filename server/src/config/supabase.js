import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

// service_role client: RLS বাইপাস করে, তাই শুধু server-এ ব্যবহার করুন
export const supabase = createClient(env.supabaseUrl, env.serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
