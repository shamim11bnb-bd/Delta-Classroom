import { AppError } from "../utils/AppError.js";

export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const msg = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    return next(new AppError(`ভুল তথ্য: ${msg}`, 422));
  }
  req.body = result.data;
  next();
};
