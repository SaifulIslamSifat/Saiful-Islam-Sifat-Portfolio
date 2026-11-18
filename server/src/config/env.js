import 'dotenv/config';

const isProd = process.env.NODE_ENV === 'production';

export const env = {
  isProd,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean),
  ipHashSalt: process.env.IP_HASH_SALT || '',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.NOTIFY_TO || '',
    from: process.env.NOTIFY_FROM || process.env.SMTP_USER || '',
  },
};

// Fail fast on missing critical config instead of failing mysteriously later.
export function assertEnv() {
  const missing = [];
  if (!env.mongoUri) missing.push('MONGODB_URI');
  if (isProd && !env.ipHashSalt) missing.push('IP_HASH_SALT');
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
