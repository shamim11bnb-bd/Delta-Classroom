import { env } from './environment.js';

const allowed = new Set([env.clientUrl, ...env.allowedOrigins].filter(Boolean).map((v) => v.replace(/\/$/, '')));
export const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.nodeEnv !== 'production' || allowed.has(origin.replace(/\/$/, ''))) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS policy.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 86400,
};
