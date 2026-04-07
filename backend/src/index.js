import "dotenv/config";
import express from "express";
import fs from "fs";
import cors from "cors";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import { logger } from "./lib/logger.js";
const app = express();
const PORT = Number(process.env.PORT ?? 3000);
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
}));
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);
const STATIC_DIR = "static";
if (fs.existsSync(STATIC_DIR)) {
    app.use("/", express.static(STATIC_DIR));
}
app.use((req, res) => {
    res.status(404).type("text").send("Not Found");
});
app.listen(PORT, () => {
    logger.info("Server started", { port: PORT });
});
//# sourceMappingURL=index.js.map