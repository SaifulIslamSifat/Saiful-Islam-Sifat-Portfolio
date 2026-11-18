import rateLimit from 'express-rate-limit';

const base = { standardHeaders: true, legacyHeaders: false };

// Broad limit for every API call.
export const apiLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 200,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

// Tight limit on the contact form to curb spam.
export const contactLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { success: false, message: 'Too many messages sent. Please try again in a few minutes.' },
});
