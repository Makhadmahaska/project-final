import { Router } from 'express';
import type { Request, Response } from 'express';
import feedbackController from '../controllers/feedbackController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', (req: Request, res: Response) =>
  feedbackController.create(req, res),
);

router.get('/', requireAuth, (req: Request, res: Response) =>
  feedbackController.getAll(req, res),
);

export default router;
