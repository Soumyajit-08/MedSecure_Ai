import { Router } from "express";
import {
  createPrediction,
  listPredictions
} from "../controllers/diagnosis.controller.js";
import { processMedicalVision, analyzePrescription } from "../controllers/vision.controller.js";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", requireAuth, createPrediction);
router.get("/", requireAuth, listPredictions);
router.post("/vision", requireAuth, upload.single("image"), processMedicalVision);
router.post("/analyze-prescription", requireAuth, upload.single("image"), analyzePrescription);
router.post("/prescription-analyzer", requireAuth, upload.single("image"), analyzePrescription);
router.get("/check-route", (_req, res) => {
  res.json({
    success: true,
    routes: [
      "POST /api/v1/predictions/analyze-prescription",
      "POST /api/v1/predictions/prescription-analyzer"
    ]
  });
});

export default router;
