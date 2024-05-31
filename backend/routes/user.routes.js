import { Router } from "express";
import {
  getMe,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import { protect } from "../middelware/auth.middleware.js";
const router = Router();

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

export const UserRoutes = router;
