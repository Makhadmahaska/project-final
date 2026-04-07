import type { Feedback } from "../types/feedback.js";
declare class FeedbackService {
    private readonly dataFilePath;
    private readAll;
    save(feedback: Feedback): Promise<void>;
    getAll(): Promise<StoredFeedback[] | {
        name: string;
        email: string;
        category: string;
        rating: number;
        message: string;
        notify: boolean;
        createdAt: Date;
        id: number;
    }[]>;
}
type StoredFeedback = Feedback & {
    id: number;
    createdAt: string;
};
declare const _default: FeedbackService;
export default _default;
//# sourceMappingURL=feedbackservice.d.ts.map