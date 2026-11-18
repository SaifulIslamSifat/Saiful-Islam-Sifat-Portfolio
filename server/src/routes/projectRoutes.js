import { Router } from 'express';
import { listProjects, getProject } from '../controllers/projectController.js';
import { projectIdRules, handleValidation } from '../middleware/validate.js';

const router = Router();

router.get('/', listProjects);
router.get('/:id', projectIdRules, handleValidation, getProject);

export default router;
