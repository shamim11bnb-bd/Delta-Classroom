import { createClient } from '@supabase/supabase-js';
import { env } from './environment.js';

// Service-role client is server-only. Authorization is enforced in middleware/controllers.
export const supabaseAdmin = createClient(env.supabaseUrl, env.serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  global: { headers: { 'X-Client-Info': 'sa-delta-classroom-server' } },
});
