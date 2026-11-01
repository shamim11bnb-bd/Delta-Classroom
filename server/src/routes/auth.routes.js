import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  res.json({ success: true, data: { user: { id: req.user.id, email: req.user.email }, profile: req.profile } });
}));
router.get('/session', authenticate, (_req, res) => res.json({ success: true, authenticated: true }));
export default router;
