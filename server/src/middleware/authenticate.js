import { supabaseAdmin } from '../config/supabase.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';

export const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) throw new HttpError(401, 'লগইন প্রয়োজন।');

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) throw new HttpError(401, 'সেশনটি সঠিক নয় বা মেয়াদ শেষ হয়েছে।');

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles').select('id, full_name, email, role, avatar_url, status').eq('id', data.user.id).maybeSingle();
  if (profileError) throw new HttpError(500, 'প্রোফাইল যাচাই করা যায়নি।');
  if (profile?.status === 'suspended' || profile?.status === 'blocked') throw new HttpError(403, 'আপনার অ্যাকাউন্ট সাময়িকভাবে বন্ধ আছে।');

  req.user = data.user;
  req.profile = profile || { id: data.user.id, email: data.user.email, full_name: data.user.user_metadata?.full_name || '', role: 'student' };
  req.accessToken = token;
  next();
});
