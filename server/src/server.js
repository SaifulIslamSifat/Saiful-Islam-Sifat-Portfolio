import app from './app.js';
import { env, assertEnv } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

async function start() {
  assertEnv();
  await connectDB();
  const server = app.listen(env.port, () => console.log(`API listening on port ${env.port}`));

  const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
