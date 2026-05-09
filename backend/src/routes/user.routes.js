import { Router } from "express";
import { listUsers, me } from "../controllers/user.controller.js";
import { allowRoles, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me", requireAuth, me);
router.get("/", requireAuth, allowRoles("admin"), listUsers);

export default router;
