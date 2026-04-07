import { PrismaClient, Prisma } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
let prisma = null;
export function getPrismaClient() {
    if (!process.env.DATABASE_URL) {
        return null;
    }
    if (prisma) {
        return prisma;
    }
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    });
    prisma = new PrismaClient({ adapter });
    return prisma;
}
export { Prisma };
//# sourceMappingURL=db.js.map