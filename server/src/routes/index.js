import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import courses from "./course.routes.js";
import assignments from "./assignment.routes.js";
import quizzes from "./quiz.routes.js";
import attendance from "./attendance.routes.js";
import notices from "./notice.routes.js";
import users from "./user.routes.js";

const r = Router();
r.get("/health", (_req, res) => res.json({ ok: true, name: "Delta Classroom API" }));

// নিচের সব রুটে লগইন লাগবে
r.use(requireAuth);
r.use("/courses", courses);
r.use("/assignments", assignments);
r.use("/quizzes", quizzes);
r.use("/attendance", attendance);
r.use("/notices", notices);
r.use("/users", users);
export default r;
