import { Router } from "express";
import {
  createGoals,
  deleteGoals,
  getGoals,
  updateGoals,
} from "../controllers/goal.controller.js";

export const goalRoutes = Router();

goalRoutes.route("/").get(getGoals).post(createGoals);

goalRoutes.route("/:id").put(updateGoals).delete(deleteGoals);
