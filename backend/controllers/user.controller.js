import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";
import { userModel } from "../model/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   check if user exists
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await userModel.findOne({ email });

  const checkPassword = await bcryptjs.compare(password, user.password);

  if (user && checkPassword) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Credentials");
  }
});

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await userModel.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });

  //   res.json({ message: "User data display" });
});

export { registerUser, loginUser, getMe };
