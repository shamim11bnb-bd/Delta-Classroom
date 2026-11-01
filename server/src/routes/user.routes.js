import { Router } from "express";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler as h } from "../utils/asyncHandler.js";
import { roleSchema } from "../validators/schemas.js";
import * as c from "../controllers/user.controller.js";

const r = Router();
r.get("/me", h(c.me));
r.get("/stats", requireRole("admin"), h(c.stats));
r.get("/", requireRole("admin"), h(c.list));
r.patch("/:id/role", requireRole("admin"), validate(roleSchema), h(c.setRole));
export default r;
