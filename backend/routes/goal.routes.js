import { Router } from "express";
import {
  createGoals,
  deleteGoals,
  getGoals,
  updateGoals,
} from "../controllers/goal.controller.js";
import { protect } from "../middelware/auth.middleware.js";

export const goalRoutes = Router();

goalRoutes.route("/").get(protect, getGoals).post(protect, createGoals);

goalRoutes.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);
