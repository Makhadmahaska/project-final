import { Router } from "express";
import feedbackController from "../controllers/feedbackController.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
router.post("/", (req, res) => feedbackController.create(req, res));
router.get("/", requireAuth, (req, res) => feedbackController.getAll(req, res));
export default router;
//# sourceMappingURL=feedbackRoutes.js.map