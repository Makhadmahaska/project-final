import { promises as fs } from 'fs';
import path from 'path';
import { Pool } from 'pg';
import type { Feedback } from '../types/feedback.js';

class FeedbackService {
  private readonly dataFilePath = path.resolve(
    process.cwd(),
    'data',
    'feedback.json',
  );
  private readonly db = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
      })
    : null;

  private async readAll() {
    try {
      const file = await fs.readFile(this.dataFilePath, 'utf8');
      return JSON.parse(file) as StoredFeedback[];
    } catch (error) {
      const nodeError = error as NodeJS.ErrnoException;

      if (nodeError.code === 'ENOENT') {
        return [];
      }

      throw error;
    }
  }

  async save(feedback: Feedback): Promise<void> {
    if (this.db) {
      await this.db.query(
        `
          INSERT INTO "Feedback" ("name", "email", "category", "rating", "message", "notify")
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          feedback.name,
          feedback.email,
          feedback.category,
          feedback.rating,
          feedback.message,
          feedback.notify,
        ],
      );

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
    if (this.db) {
      const result = await this.db.query<StoredFeedback>(
        `
          SELECT "id", "name", "email", "category", "rating", "message", "notify", "createdAt"
          FROM "Feedback"
          ORDER BY "createdAt" DESC
        `,
      );

      return result.rows;
    }

    return this.readAll();
  }
}

type StoredFeedback = Feedback & {
  id: number;
  createdAt: string;
};

export default new FeedbackService();
