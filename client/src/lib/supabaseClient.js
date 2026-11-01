import { createClient } from "@supabase/supabase-js";

// শুধু anon key ব্যবহার করুন। service_role key কখনো client-এ নয়।
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
