
import type { Request, Response } from 'express';
import feedbackService from '../services/feedbackservice.js';
import { feedbackSchema } from '../validation/feedbackValidator.js';
import { success } from 'zod';

type FeedbackServiceType = typeof feedbackService;

class FeedbackController {
  constructor(private feedbackService: FeedbackServiceType) {}

  async create(req: Request, res: Response) {
    // Validate request body
    const validation = feedbackSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        errors: validation.error.issues.map((err) => err.message),
      });
      return;
    }

    const feedback = validation.data;

    // Save feedback using the service
    await this.feedbackService.save(feedback);

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
    });
  }

  async getAll(req: Request, res: Response) {
    const feedbacks = await this.feedbackService.getAll();

    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  }
}

export default new FeedbackController(feedbackService);
