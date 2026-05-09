import { Router } from "express";
import multer from "multer";
import { listReports, uploadReport } from "../controllers/report.controller.js";
import { requireAuth } from "../middleware/auth.js";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/", requireAuth, upload.single("report"), uploadReport);
router.get("/", requireAuth, listReports);

export default router;
