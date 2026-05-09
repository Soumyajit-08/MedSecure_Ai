import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import analyticsRoutes from "./analytics.routes.js";
import appointmentRoutes from "./appointment.routes.js";
import authRoutes from "./auth.routes.js";
import chatRoutes from "./chat.routes.js";
import diagnosisRoutes from "./diagnosis.routes.js";
import illnessRoutes from "./illness.routes.js";
import reportRoutes from "./report.routes.js";
import userRoutes from "./user.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import { getDatabaseStatus } from "../config/db.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "medsecure-api",
    status: "ok",
    database: getDatabaseStatus()
  });
});

router.use("/illness", illnessRoutes);

// Routes below this line will use in-memory fallback if the database is disconnected
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/predictions", diagnosisRoutes);
router.use("/chatbot", chatRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/reports", reportRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
