import { body, param, validationResult } from 'express-validator';

// Runs after the validation chains; returns a 422 with per-field messages.
export function handleValidation(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = {};
  for (const e of result.array()) if (!errors[e.path]) errors[e.path] = e.msg;
  return res.status(422).json({ success: false, message: 'Please check the form and try again.', errors });
}

export const contactRules = [
  body('name').isString().trim().isLength({ min: 2, max: 100 }).withMessage('Please enter your full name.'),
  body('email').isString().trim().isEmail().withMessage('Please enter a valid email address.').isLength({ max: 254 }).normalizeEmail(),
  body('subject').isString().trim().isLength({ min: 3, max: 150 }).withMessage('Please add a short subject.'),
  body('message').isString().trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10 to 2000 characters.'),
  // Honeypot field: real visitors leave it empty
  body('website').optional({ values: 'falsy' }).isString().isLength({ max: 500 }),
];

// A project can be requested by Mongo ObjectId or by slug.
export const projectIdRules = [
  param('id')
    .isString()
    .trim()
    .matches(/^[a-zA-Z0-9-]{1,80}$/)
    .withMessage('Invalid project id.'),
];
