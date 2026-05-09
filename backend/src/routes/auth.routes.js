import { Router } from "express";
import {
  forgotPassword,
  googleOAuth,
  login,
  signup,
  verifyEmail
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/google/callback", googleOAuth);

export default router;
