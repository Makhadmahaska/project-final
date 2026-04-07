import type { Request, Response } from 'express';
import feedbackService from '../services/feedbackservice.js';
type FeedbackServiceType = typeof feedbackService;
declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackServiceType);
    create(req: Request, res: Response): Promise<void>;
    getAll(req: Request, res: Response): Promise<void>;
}
declare const _default: FeedbackController;
export default _default;
//# sourceMappingURL=feedbackController.d.ts.map