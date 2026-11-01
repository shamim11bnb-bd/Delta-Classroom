import * as svc from "../services/user.service.js";

export const me = async (req, res) => res.json({ data: req.user });
export const list = async (_req, res) => res.json({ data: await svc.listUsers() });
export const setRole = async (req, res) => res.json({ data: await svc.setRole(req.params.id, req.body.role) });
export const stats = async (_req, res) => res.json({ data: await svc.stats() });
