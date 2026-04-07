import { promises as fs } from "fs";
import path from "path";
import { getPrismaClient } from "../../lib/db.js";
class FeedbackService {
    dataFilePath = path.resolve(process.cwd(), "data", "feedback.json");
    async readAll() {
        try {
            const file = await fs.readFile(this.dataFilePath, "utf8");
            return JSON.parse(file);
        }
        catch (error) {
            const nodeError = error;
            if (nodeError.code === "ENOENT") {
                return [];
            }
            throw error;
        }
    }
    async save(feedback) {
        const prisma = getPrismaClient();
        if (prisma) {
            await prisma.feedback.create({
                data: feedback,
            });
            return;
        }
        const current = await this.readAll();
        const nextId = current.reduce((maxId, entry) => Math.max(maxId, entry.id), 0) + 1;
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
export default new FeedbackService();
//# sourceMappingURL=feedbackservice.js.map