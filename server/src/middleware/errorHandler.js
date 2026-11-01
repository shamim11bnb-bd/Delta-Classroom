import { ZodError } from 'zod';
import { HttpError } from '../utils/httpError.js';

export function notFound(req, _res, next) { next(new HttpError(404, `Route পাওয়া যায়নি: ${req.method} ${req.originalUrl}`)); }
export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) return res.status(400).json({ success: false, error: 'ইনপুট সঠিক নয়।', details: error.issues });
  const status = error instanceof HttpError ? error.status : 500;
  if (status >= 500) console.error(error);
  return res.status(status).json({ success: false, error: status >= 500 ? 'সার্ভারে সমস্যা হয়েছে।' : error.message, ...(error.details ? { details: error.details } : {}) });
}
