import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { requireAuth, requireAdmin } from "../middleware/auth";
import * as auth from "../controllers/auth.controller";
import * as courses from "../controllers/courses.controller";
import * as student from "../controllers/student.controller";
import * as admin from "../controllers/admin.controller";

const router = Router();
const validate = (schema: z.ZodTypeAny) => (req: any, res: any, next: any) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Validation failed.", details: parsed.error.flatten() });
  req.body = parsed.data; next();
};
const registerSchema = z.object({ full_name:z.string().min(2).max(100), email:z.string().email(), password:z.string().min(8).max(100), phone:z.string().max(30).optional() });
const loginSchema = z.object({ email:z.string().email(), password:z.string().min(1) });
const forgotSchema = z.object({ email:z.string().email() });
const courseSchema = z.object({
  title:z.string().min(2).max(160), slug:z.string().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description:z.string().max(10000).optional(), thumbnail_url:z.string().url().nullable().optional(),
  price:z.coerce.number().min(0).max(10000000).optional(), level:z.string().max(40).optional(), published:z.boolean().optional()
});

router.get("/health", (_req,res)=>res.json({status:"ok",service:"SA Delta Classroom API"}));
router.post("/auth/register", validate(registerSchema), asyncHandler(auth.register));
router.post("/auth/login", validate(loginSchema), asyncHandler(auth.login));
router.post("/auth/logout", requireAuth, asyncHandler(auth.logout));
router.post("/auth/forgot-password", validate(forgotSchema), asyncHandler(auth.forgotPassword));
router.get("/auth/me", requireAuth, asyncHandler(auth.me));

router.get("/courses", asyncHandler(courses.listCourses));
router.get("/courses/:id", asyncHandler(courses.getCourse));
router.post("/courses", requireAuth, requireAdmin, validate(courseSchema), asyncHandler(courses.createCourse));
router.patch("/courses/:id", requireAuth, requireAdmin, validate(courseSchema.partial()), asyncHandler(courses.updateCourse));
router.delete("/courses/:id", requireAuth, requireAdmin, asyncHandler(courses.deleteCourse));

router.get("/student/courses", requireAuth, asyncHandler(student.myCourses));
router.post("/student/courses/:courseId/enroll", requireAuth, asyncHandler(student.enroll));
router.get("/notices", asyncHandler(student.listNotices));

router.get("/admin/stats", requireAuth, requireAdmin, asyncHandler(admin.adminStats));
router.get("/admin/users", requireAuth, requireAdmin, asyncHandler(admin.adminUsers));
export default router;
