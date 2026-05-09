import { Router } from "express";
import {
  createAppointment,
  listAppointments
} from "../controllers/appointment.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.post("/", requireAuth, createAppointment);
router.get("/", requireAuth, listAppointments);

export default router;
