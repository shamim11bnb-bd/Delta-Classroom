import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { createResource, deleteResource, listResource, updateResource } from '../services/resourceService.js';

const payloadSchema = z.record(z.any()).refine((value) => Object.keys(value).length > 0, 'কমপক্ষে একটি ফিল্ড প্রয়োজন।');
export const list = (key) => asyncHandler(async (req, res) => res.json({ success: true, ...(await listResource(key, req.profile, req.query)) }));
export const create = (key) => asyncHandler(async (req, res) => {
  const payload = payloadSchema.parse(req.body);
  const data = await createResource(key, req.profile, payload);
  res.status(201).json({ success: true, data });
});
export const update = (key) => asyncHandler(async (req, res) => {
  if (!z.string().uuid().safeParse(req.params.id).success) throw new HttpError(400, 'সঠিক রেকর্ড ID দিন।');
  const payload = payloadSchema.parse(req.body);
  const data = await updateResource(key, req.profile, req.params.id, payload);
  res.json({ success: true, data });
});
export const remove = (key) => asyncHandler(async (req, res) => {
  if (!z.string().uuid().safeParse(req.params.id).success) throw new HttpError(400, 'সঠিক রেকর্ড ID দিন।');
  res.json({ success: true, data: await deleteResource(key, req.profile, req.params.id) });
});
