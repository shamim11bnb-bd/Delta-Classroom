import * as svc from "../services/notice.service.js";

export const create = async (req, res) => res.status(201).json({ data: await svc.createNotice(req.user, req.body) });
export const remove = async (req, res) => { await svc.deleteNotice(req.user, req.params.id); res.status(204).end(); };
