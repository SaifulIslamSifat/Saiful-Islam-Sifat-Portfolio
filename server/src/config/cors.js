import { env } from './env.js';

// Strict allow-list: only the configured frontend origins may call the API from a browser.
// Requests with no Origin header (curl, health checks, server-to-server) are allowed through;
// they are still protected by rate limiting and validation.
export const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.clientOrigins.includes(origin)) return callback(null, true);
    return callback(Object.assign(new Error('Origin not allowed by CORS'), { status: 403 }));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  maxAge: 600,
};
