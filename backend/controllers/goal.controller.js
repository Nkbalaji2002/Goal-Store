import asyncHandler from "express-async-handler";
import { goalModel } from "../model/goal.model.js";
import { userModel } from "../model/user.model.js";

// get the all goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find({
    user: req.user.id,
  });

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
    user: req.user.id,
  };

  const result = await goalModel.create(newGoal);
  res.status(200).json(result);
});

// update the goal for edit
const updateGoals = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const goal = await goalModel.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  if (!text) {
    res.status(400);
    throw new Error("Goal not Updated");
  }

  // check the user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // /make sure only the logged user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updateGoal = { text: text };

  const result = await goalModel.findByIdAndUpdate(id, updateGoal);

  if (!result) {
    return res.status(404).json({ message: "Goal Not Found." });
  }

  res.status(200).json({ message: "Goal Updated Successfully" });
});

const deleteGoals = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const goal = await goalModel.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  // check the user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // /make sure only the logged user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const result = await goalModel.findByIdAndDelete(id);

  if (!result) {
    return res.status(404).json({ message: "Goal Not Found." });
  }

  return res.status(200).json({ message: "Goal Deleted Successfully" });
});

export { getGoals, createGoals, updateGoals, deleteGoals };
