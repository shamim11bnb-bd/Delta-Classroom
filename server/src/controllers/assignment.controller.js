import * as svc from "../services/assignment.service.js";

export const create = async (req, res) => res.status(201).json({ data: await svc.createAssignment(req.user, req.body) });
export const submit = async (req, res) => res.status(201).json({ data: await svc.submit(req.user, req.params.id, req.body) });
export const grade = async (req, res) => res.json({ data: await svc.grade(req.user, req.params.id, req.body) });
