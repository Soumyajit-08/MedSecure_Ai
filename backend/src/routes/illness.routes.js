import { Router } from "express";
import { listIllnessDataset, searchIllness } from "../controllers/illness.controller.js";

const router = Router();

router.get("/dataset", listIllnessDataset);
router.post("/search", searchIllness);

export default router;
