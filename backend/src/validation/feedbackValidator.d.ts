import { z } from 'zod';
export declare const feedbackSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    category: z.ZodString;
    rating: z.ZodNumber;
    message: z.ZodString;
    notify: z.ZodBoolean;
}, z.core.$strip>;
//# sourceMappingURL=feedbackValidator.d.ts.map