import * as svc from "../services/attendance.service.js";

export const mark = async (req, res) => res.json({ data: await svc.mark(req.user, req.body) });
