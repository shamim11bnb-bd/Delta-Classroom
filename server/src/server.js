import { validateEnvironment, env } from './config/environment.js';
validateEnvironment();
const { default: app } = await import('./app.js');
const server = app.listen(env.port, '0.0.0.0', () => {
  console.log(`SA Delta Classroom API listening on port ${env.port}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Closing server...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
