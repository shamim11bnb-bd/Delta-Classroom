import * as svc from "../services/quiz.service.js";

export const create = async (req, res) => res.status(201).json({ data: await svc.createQuiz(req.user, req.body) });
export const submit = async (req, res) =>
  res.status(201).json({ data: await svc.submitQuiz(req.user, req.params.id, req.body.answers) });
