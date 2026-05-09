import { Router } from "express";
import { getAdminAnalytics } from "../controllers/analytics.controller.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

const router = Router();
router.get("/admin", requireAuth, allowRoles("admin"), getAdminAnalytics);

export default router;
