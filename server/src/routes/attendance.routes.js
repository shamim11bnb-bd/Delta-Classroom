import { Router } from "express";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler as h } from "../utils/asyncHandler.js";
import { attendanceSchema } from "../validators/schemas.js";
import * as c from "../controllers/attendance.controller.js";

const r = Router();
r.post("/", requireRole("teacher", "admin"), validate(attendanceSchema), h(c.mark));
export default r;
