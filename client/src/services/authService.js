import {supabase} from '../lib/supabaseClient.js';
export const getCurrentSession=()=>supabase?.auth.getSession();export const signOut=()=>supabase?.auth.signOut();
