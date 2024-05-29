import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

app.get("/api/v1/goals", (req, res) => {
  res.json({
    message: "Get Goals",
  });
  //   res.send("Hello World");
});

// server runing on
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
