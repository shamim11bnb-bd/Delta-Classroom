import * as svc from "../services/course.service.js";

export const create = async (req, res) => res.status(201).json({ data: await svc.createCourse(req.user, req.body) });
export const update = async (req, res) => res.json({ data: await svc.updateCourse(req.user, req.params.id, req.body) });
export const remove = async (req, res) => { await svc.deleteCourse(req.user, req.params.id); res.status(204).end(); };
export const enroll = async (req, res) => res.status(201).json({ data: await svc.enroll(req.user, req.params.id) });
export const addLesson = async (req, res) => res.status(201).json({ data: await svc.addLesson(req.user, req.params.id, req.body) });
export const removeLesson = async (req, res) => { await svc.deleteLesson(req.user, req.params.lessonId); res.status(204).end(); };
