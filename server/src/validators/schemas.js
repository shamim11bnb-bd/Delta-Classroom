import { z } from "zod";

const optionalUrl = z.string().url().optional().or(z.literal("")).transform((v) => v || null);

export const courseSchema = z.object({
  title: z.string().trim().min(3, "কমপক্ষে ৩ অক্ষর").max(120),
  description: z.string().trim().max(5000).default(""),
  category: z.string().trim().max(60).default("সাধারণ"),
  level: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
  price: z.coerce.number().min(0).default(0),
  is_published: z.boolean().default(false),
});
export const coursePatchSchema = courseSchema.partial();

export const lessonSchema = z.object({
  title: z.string().trim().min(2).max(150),
  content: z.string().max(10000).default(""),
  video_url: optionalUrl,
  material_url: optionalUrl,
  position: z.coerce.number().int().min(0).default(0),
  is_preview: z.boolean().default(false),
});

export const assignmentSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().trim().min(2).max(150),
  description: z.string().max(5000).default(""),
  due_at: z.string().optional().or(z.literal("")).transform((v) => (v ? new Date(v).toISOString() : null)),
  max_marks: z.coerce.number().int().min(1).max(1000).default(100),
});

export const submitSchema = z.object({
  answer_text: z.string().max(10000).default(""),
  file_url: optionalUrl,
});

export const gradeSchema = z.object({
  marks: z.coerce.number().int().min(0),
  feedback: z.string().max(2000).default(""),
});

export const quizSchema = z.object({
  course_id: z.string().uuid(),
  title: z.string().trim().min(2).max(150),
  duration_minutes: z.coerce.number().int().min(1).max(300).default(10),
  questions: z
    .array(
      z.object({
        question: z.string().trim().min(2),
        options: z.array(z.string().trim().min(1)).min(2).max(6),
        correct_index: z.coerce.number().int().min(0),
      })
    )
    .min(1, "কমপক্ষে ১টি প্রশ্ন দিন"),
});

export const quizSubmitSchema = z.object({
  answers: z.record(z.string().uuid(), z.coerce.number().int().min(0)),
});

export const attendanceSchema = z.object({
  course_id: z.string().uuid(),
  class_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "তারিখ YYYY-MM-DD হতে হবে"),
  records: z
    .array(z.object({ student_id: z.string().uuid(), status: z.enum(["present", "absent", "late"]) }))
    .min(1),
});

export const noticeSchema = z.object({
  course_id: z.string().uuid().nullable().optional(),
  title: z.string().trim().min(2).max(150),
  body: z.string().max(5000).default(""),
});

export const roleSchema = z.object({ role: z.enum(["student", "teacher", "admin"]) });
