import { Router } from "express";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler as h } from "../utils/asyncHandler.js";
import { courseSchema, coursePatchSchema, lessonSchema } from "../validators/schemas.js";
import * as c from "../controllers/course.controller.js";

const r = Router();
r.post("/", requireRole("teacher", "admin"), validate(courseSchema), h(c.create));
r.patch("/:id", requireRole("teacher", "admin"), validate(coursePatchSchema), h(c.update));
r.delete("/:id", requireRole("teacher", "admin"), h(c.remove));
r.post("/:id/enroll", requireRole("student"), h(c.enroll));
r.post("/:id/lessons", requireRole("teacher", "admin"), validate(lessonSchema), h(c.addLesson));
r.delete("/:id/lessons/:lessonId", requireRole("teacher", "admin"), h(c.removeLesson));
export default r;
