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



export default router;

