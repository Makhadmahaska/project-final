import { promises as fs } from "fs";
import path from "path";
import type { Feedback } from "../types/feedback.js";
import { getPrismaClient } from "../../lib/db.js";

class FeedbackService {
  private readonly dataFilePath = path.resolve(
    process.cwd(),
    "data",
    "feedback.json"
  );

  private async readAll() {
    try {
      const file = await fs.readFile(this.dataFilePath, "utf8");
      return JSON.parse(file) as StoredFeedback[];
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;

      if (nodeError.code === "ENOENT") {
        return [];
      }

      throw error;
    }
  }

  async save(feedback: Feedback): Promise<void> {
    const prisma = getPrismaClient();

    if (prisma) {
      await prisma.feedback.create({
        data: feedback,
      });
      return;
    }

    const current = await this.readAll();
    const nextId =
      current.reduce((maxId, entry) => Math.max(maxId, entry.id), 0) + 1;

    current.unshift({
      ...feedback,
      id: nextId,
      createdAt: new Date().toISOString(),
    });

    await fs.mkdir(path.dirname(this.dataFilePath), { recursive: true });
    await fs.writeFile(this.dataFilePath, JSON.stringify(current, null, 2));
  }

  async getAll() {
    const prisma = getPrismaClient();

    if (prisma) {
      return prisma.feedback.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return this.readAll();
  }
}

type StoredFeedback = Feedback & {
  id: number;
  createdAt: string;
};

export default new FeedbackService();
