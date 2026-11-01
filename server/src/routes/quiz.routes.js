import { Router } from "express";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler as h } from "../utils/asyncHandler.js";
import { quizSchema, quizSubmitSchema } from "../validators/schemas.js";
import * as c from "../controllers/quiz.controller.js";

const r = Router();
r.post("/", requireRole("teacher", "admin"), validate(quizSchema), h(c.create));
r.post("/:id/submit", requireRole("student"), validate(quizSubmitSchema), h(c.submit));
export default r;
