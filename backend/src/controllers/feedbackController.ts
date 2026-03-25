import type { Request, Response } from 'express';
import feedbackService from '../services/feedbackservice.js';
import { feedbackSchema } from '../validation/feedbackValidator.js';

type FeedbackServiceType = typeof feedbackService;

class FeedbackController {
  constructor(private feedbackService: FeedbackServiceType) {}

  async create(req: Request, res: Response) {
    try {
      const validation = feedbackSchema.safeParse(req.body);

      if (!validation.success) {
        res.status(400).json({
          success: false,
          errors: validation.error.issues.map((err) => err.message),
        });
        return;
      }

      const feedback = validation.data;

      await this.feedbackService.save(feedback);

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to save feedback';

      res.status(500).json({
        success: false,
        message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const feedbacks = await this.feedbackService.getAll();

      res.status(200).json({
        success: true,
        data: feedbacks,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch feedback';

      res.status(500).json({
        success: false,
        message,
      });
    }
  }
}

export default new FeedbackController(feedbackService);
