import express from "express";
import { config } from "dotenv";
import { goalRoutes } from "./routes/goal.routes.js";
import { errorHandler } from "./middelware/error.middleware.js";
import { connectDB } from "./config/db.config.js";
import { UserRoutes } from "./routes/user.routes.js";
import cors from "cors";

config();

connectDB(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/users", UserRoutes);

// error middleware
app.use(errorHandler);

// server runing on
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
