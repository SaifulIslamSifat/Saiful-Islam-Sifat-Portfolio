import { Router } from 'express';
import { createContactMessage } from '../controllers/contactController.js';
import { contactRules, handleValidation } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', contactLimiter, contactRules, handleValidation, createContactMessage);

export default router;
