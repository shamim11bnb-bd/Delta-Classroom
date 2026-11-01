import { Router } from "express";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler as h } from "../utils/asyncHandler.js";
import { assignmentSchema, submitSchema, gradeSchema } from "../validators/schemas.js";
import * as c from "../controllers/assignment.controller.js";

const r = Router();
r.post("/", requireRole("teacher", "admin"), validate(assignmentSchema), h(c.create));
r.post("/:id/submit", requireRole("student"), validate(submitSchema), h(c.submit));
r.patch("/submissions/:id/grade", requireRole("teacher", "admin"), validate(gradeSchema), h(c.grade));
export default r;
