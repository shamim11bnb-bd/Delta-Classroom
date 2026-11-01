export function notFound(req, res) {
  res.status(404).json({ error: `${req.method} ${req.originalUrl} পাওয়া যায়নি` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  let status = err.status || 500;
  let message = err.message || "সার্ভারে সমস্যা হয়েছে";

  if (err.code === "23505") {
    status = 409;
    message = "এটি আগেই করা হয়েছে";
  } else if (err.code === "23503") {
    status = 400;
    message = "সংশ্লিষ্ট তথ্য পাওয়া যায়নি";
  }

  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "সার্ভারে সমস্যা হয়েছে" : message });
}
