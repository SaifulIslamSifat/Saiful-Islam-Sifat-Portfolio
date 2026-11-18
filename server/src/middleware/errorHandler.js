import { env } from '../config/env.js';

export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Route not found.' });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error.';

  if (err.type === 'entity.parse.failed') {
    status = 400;
    message = 'Invalid JSON body.';
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = 'Request body too large.';
  } else if (err.name === 'ValidationError') {
    status = 422;
  } else if (err.name === 'CastError') {
    status = 400;
    message = 'Invalid identifier.';
  }

  // Never leak internals for unexpected server errors.
  if (status >= 500) {
    console.error(err);
    if (env.isProd) message = 'Internal server error.';
  }
  res.status(status).json({ success: false, message });
}
