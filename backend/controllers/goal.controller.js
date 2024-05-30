import asyncHandler from "express-async-handler";
import { goalModel } from "../model/goal.model.js";

// get the all goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find();

  if (!goals) {
    res.status(400);
    throw new Error("Goals Not Found here");
  }

  res.status(200).json({ count: goals.length, data: goals });
});

// post the goal for create
const createGoals = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please Add a Text Field");
  }

  const newGoal = {
    text: text,
  };

  const result = await goalModel.create(newGoal);
  res.status(200).json(result);
});

// update the goal for edit
const updateGoals = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Goal not Updated");
  }

  const updateGoal = { text: text };

  const result = await goalModel.findByIdAndUpdate(id, updateGoal);

  if (!result) {
    return res.status(404).json({ message: "Goal Not Found." });
  }

  res.status(200).json({ message: "Goal Updated Successfully" });
});

// delete the goal
const deleteGoals = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await goalModel.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({ message: "Goal Not Found." });
  }

  return res.status(200).json({ message: "Goal Deleted Successfully" });
});

export { getGoals, createGoals, updateGoals, deleteGoals };
