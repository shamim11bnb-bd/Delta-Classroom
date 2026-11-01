import { Router } from "express";
import { requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler as h } from "../utils/asyncHandler.js";
import { noticeSchema } from "../validators/schemas.js";
import * as c from "../controllers/notice.controller.js";

const r = Router();
r.post("/", requireRole("teacher", "admin"), validate(noticeSchema), h(c.create));
r.delete("/:id", requireRole("teacher", "admin"), h(c.remove));
export default r;
