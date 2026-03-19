import { prisma, Prisma } from '../lib/prisma';

class FeedbackService {
  async save(feedback: Prisma.FeedbackCreateInput): Promise<void> {
    // Save to database
    await prisma.feedback.create({
      data: feedback,
    });
  }

  async getAll() {
    return await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default new FeedbackService();