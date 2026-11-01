import { Router } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../config/supabase.js';
import { authenticate } from '../middleware/authenticate.js';
import { allowRoles } from '../middleware/authorize.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';

const router = Router();
router.use(authenticate);
router.get('/me', asyncHandler(async (req, res) => res.json({ success: true, data: req.profile })));
router.patch('/me', asyncHandler(async (req, res) => {
  const body = z.object({ full_name: z.string().trim().min(2).max(100).optional(), avatar_url: z.string().url().max(500).nullable().optional() }).strict().parse(req.body);
  const { data, error } = await supabaseAdmin.from('profiles').update(body).eq('id', req.user.id).select('*').single();
  if (error) throw new HttpError(400, 'প্রোফাইল আপডেট করা যায়নি।', error.message);
  res.json({ success: true, data });
}));
router.get('/:id', asyncHandler(async (req, res) => {
  if (req.params.id !== req.user.id && req.profile.role !== 'admin' && req.profile.role !== 'teacher') throw new HttpError(403, 'অনুমতি নেই।');
  const { data, error } = await supabaseAdmin.from('profiles').select('id,full_name,email,role,avatar_url,created_at').eq('id', req.params.id).maybeSingle();
  if (error) throw new HttpError(500, 'প্রোফাইল লোড করা যায়নি।');
  if (!data) throw new HttpError(404, 'ইউজার পাওয়া যায়নি।');
  res.json({ success: true, data });
}));
router.patch('/:id/role', allowRoles('admin'), asyncHandler(async (req, res) => {
  const { role } = z.object({ role: z.enum(['student', 'teacher', 'admin']) }).parse(req.body);
  if (req.params.id === req.user.id && role !== 'admin') throw new HttpError(400, 'নিজের Admin role পরিবর্তন করা যাবে না।');
  const { data, error } = await supabaseAdmin.from('profiles').update({ role }).eq('id', req.params.id).select('id,full_name,email,role').single();
  if (error) throw new HttpError(400, 'Role পরিবর্তন করা যায়নি।', error.message);
  res.json({ success: true, data });
}));
export default router;
