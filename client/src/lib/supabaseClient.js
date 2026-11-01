import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const missingClientEnv = [
  !supabaseUrl && "VITE_SUPABASE_URL",
  !supabaseAnonKey && "VITE_SUPABASE_ANON_KEY",
  !import.meta.env.VITE_API_URL?.trim() && "VITE_API_URL",
].filter(Boolean);

export const isClientConfigured = missingClientEnv.length === 0;

// Missing Render variables should show a setup message instead of a blank page.
export const supabase = isClientConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
