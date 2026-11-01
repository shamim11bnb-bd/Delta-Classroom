import { z } from 'zod';

export const idSchema = z.string().uuid();
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(120).optional(),
  sort: z.string().trim().max(40).optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
}).passthrough();
export const recordSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  name: z.string().trim().min(1).max(200).optional(),
  description: z.string().max(10000).nullable().optional(),
  category: z.string().max(120).nullable().optional(),
  status: z.string().max(40).optional(),
  is_published: z.boolean().optional(),
  course_id: z.string().uuid().nullable().optional(),
  student_id: z.string().uuid().nullable().optional(),
  teacher_id: z.string().uuid().nullable().optional(),
  due_date: z.string().datetime().nullable().optional(),
  start_at: z.string().datetime().nullable().optional(),
  end_at: z.string().datetime().nullable().optional(),
}).passthrough();
