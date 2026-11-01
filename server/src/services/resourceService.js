import { supabaseAdmin } from '../config/supabase.js';
import { HttpError } from '../utils/httpError.js';

export const resources = {
  courses: { table: 'courses', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'description', 'category'], owner: 'teacher_id' },
  assignments: { table: 'assignments', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'description'], owner: 'teacher_id' },
  quizzes: { table: 'quizzes', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'description'], owner: 'teacher_id' },
  attendance: { table: 'attendance', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['status', 'notes'], owner: 'student_id' },
  notices: { table: 'notices', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'description', 'body'], owner: 'created_by' },
  users: { table: 'profiles', read: ['admin'], write: ['admin'], search: ['full_name', 'email', 'role'] },
  lessons: { table: 'lessons', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'content'], owner: 'teacher_id' },
  exams: { table: 'exams', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'description'], owner: 'teacher_id' },
  submissions: { table: 'submissions', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher', 'student'], search: ['status', 'feedback'], owner: 'student_id' },
  enrollments: { table: 'enrollments', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['status'], owner: 'student_id' },
  payments: { table: 'payments', read: ['admin'], write: ['admin'], search: ['status', 'transaction_id'], owner: 'student_id' },
  categories: { table: 'categories', read: ['admin', 'teacher', 'student'], write: ['admin'], search: ['name', 'description'] },
  results: { table: 'quiz_attempts', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['status'], owner: 'student_id' },
  reports: { table: 'reports', read: ['admin'], write: ['admin'], search: ['title', 'description'] },
  settings: { table: 'platform_settings', read: ['admin'], write: ['admin'], search: ['key', 'value'] },
  notifications: { table: 'notifications', read: ['admin', 'teacher', 'student'], write: ['admin', 'teacher'], search: ['title', 'message'], owner: 'user_id' },
};

const safeColumns = new Set(['id', 'title', 'name', 'description', 'category', 'status', 'role', 'is_published', 'course_id', 'student_id', 'teacher_id', 'created_at', 'updated_at', 'user_id']);

export async function listResource(key, profile, query) {
  const cfg = resources[key];
  if (!cfg) throw new HttpError(404, 'এই রিসোর্সটি পাওয়া যায়নি।');
  if (!cfg.read.includes(profile.role)) throw new HttpError(403, 'এই তথ্য দেখার অনুমতি নেই।');
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  let builder = supabaseAdmin.from(cfg.table).select('*', { count: 'exact' });

  if (profile.role === 'student') {
    if (key === 'courses') builder = builder.eq('is_published', true);
    if (cfg.owner === 'student_id') builder = builder.eq('student_id', profile.id);
    if (cfg.owner === 'user_id') builder = builder.eq('user_id', profile.id);
  } else if (profile.role === 'teacher' && cfg.owner === 'teacher_id') {
    builder = builder.eq('teacher_id', profile.id);
  }
  if (query.course_id && safeColumns.has('course_id')) builder = builder.eq('course_id', String(query.course_id));
  if (query.status && safeColumns.has('status')) builder = builder.eq('status', String(query.status));
  if (query.role && key === 'users') builder = builder.eq('role', String(query.role));
  if (query.search && cfg.search?.length) {
    const term = String(query.search).replace(/[(),]/g, ' ');
    builder = builder.or(cfg.search.map((column) => `${column}.ilike.%${term}%`).join(','));
  }
  const sort = safeColumns.has(query.sort) ? query.sort : 'created_at';
  builder = builder.order(sort, { ascending: query.order === 'asc', nullsFirst: false }).range((page - 1) * limit, page * limit - 1);
  const { data, error, count } = await builder;
  if (error) throw new HttpError(500, `ডেটাবেইস থেকে ${key} লোড করা যায়নি।`, error.message);
  return { data: data || [], pagination: { page, limit, total: count || 0, pages: Math.ceil((count || 0) / limit) } };
}

export async function createResource(key, profile, payload) {
  const cfg = resources[key];
  if (!cfg || !cfg.write.includes(profile.role)) throw new HttpError(403, 'এই তথ্য তৈরি করার অনুমতি নেই।');
  const record = { ...payload };
  delete record.id; delete record.created_at; delete record.updated_at;
  if (cfg.owner === 'teacher_id' && profile.role === 'teacher') record.teacher_id = profile.id;
  if (cfg.owner === 'created_by') record.created_by = profile.id;
  if (cfg.owner === 'student_id' && profile.role === 'student') record.student_id = profile.id;
  if (cfg.owner === 'user_id') record.user_id = profile.id;
  const { data, error } = await supabaseAdmin.from(cfg.table).insert(record).select('*').single();
  if (error) throw new HttpError(400, 'তথ্য সংরক্ষণ করা যায়নি। টেবিলের কলাম ও প্রয়োজনীয় তথ্য যাচাই করুন।', error.message);
  return data;
}

export async function updateResource(key, profile, id, payload) {
  const cfg = resources[key];
  if (!cfg || !cfg.write.includes(profile.role)) throw new HttpError(403, 'এই তথ্য পরিবর্তনের অনুমতি নেই।');
  const record = { ...payload };
  ['id', 'created_at', 'updated_at', 'teacher_id', 'student_id', 'user_id'].forEach((field) => delete record[field]);
  // Students may submit or replace their answer, but cannot grade themselves or change ownership/status.
  if (key === 'submissions' && profile.role === 'student') {
    const permitted = ['answer_text', 'file_url'];
    Object.keys(record).forEach((field) => { if (!permitted.includes(field)) delete record[field]; });
    if (!Object.keys(record).length) throw new HttpError(400, 'শিক্ষার্থী শুধু উত্তর বা ফাইল পরিবর্তন করতে পারবেন।');
  }
  // A teacher may grade submissions but may not change the submitting student.
  if (key === 'submissions' && profile.role === 'teacher') {
    const permitted = ['status', 'marks', 'feedback'];
    Object.keys(record).forEach((field) => { if (!permitted.includes(field)) delete record[field]; });
    if (!Object.keys(record).length) throw new HttpError(400, 'শিক্ষক শুধু মূল্যায়ন ও Feedback পরিবর্তন করতে পারবেন।');
  }
  let builder = supabaseAdmin.from(cfg.table).update(record).eq('id', id);
  if (profile.role === 'teacher' && cfg.owner === 'teacher_id') builder = builder.eq('teacher_id', profile.id);
  if (profile.role === 'student' && cfg.owner === 'student_id') builder = builder.eq('student_id', profile.id);
  const { data, error } = await builder.select('*').maybeSingle();
  if (error) throw new HttpError(400, 'তথ্য আপডেট করা যায়নি।', error.message);
  if (!data) throw new HttpError(404, 'রেকর্ড পাওয়া যায়নি বা পরিবর্তনের অনুমতি নেই।');
  return data;
}

export async function deleteResource(key, profile, id) {
  const cfg = resources[key];
  if (!cfg || profile.role !== 'admin') throw new HttpError(403, 'রেকর্ড মুছতে Admin অনুমতি প্রয়োজন।');
  const { error, count } = await supabaseAdmin.from(cfg.table).delete({ count: 'exact' }).eq('id', id);
  if (error) throw new HttpError(400, 'রেকর্ড মুছতে সমস্যা হয়েছে।', error.message);
  return { deleted: true, count };
}
