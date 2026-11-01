import { HttpError } from '../utils/httpError.js';

export const allowRoles = (...roles) => (req, _res, next) => {
  if (!req.profile || !roles.includes(req.profile.role)) return next(new HttpError(403, 'এই কাজটি করার অনুমতি নেই।'));
  next();
};

export const allowSelfOrRoles = (param = 'id', ...roles) => (req, _res, next) => {
  const isSelf = req.params[param] === req.user?.id;
  if (isSelf || roles.includes(req.profile?.role)) return next();
  next(new HttpError(403, 'এই তথ্য দেখার অনুমতি নেই।'));
};
