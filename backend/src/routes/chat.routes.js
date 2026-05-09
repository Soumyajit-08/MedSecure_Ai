import { Router } from "express";
import { chat, getHistory, deleteHistoryItem, clearHistory } from "../controllers/chat.controller.js";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", requireAuth, upload.single("file"), chat);
router.get("/history", requireAuth, getHistory);
router.delete("/history/:messageId", requireAuth, deleteHistoryItem);
router.delete("/history", requireAuth, clearHistory);

export default router;
