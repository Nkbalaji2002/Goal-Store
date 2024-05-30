import mongoose from "mongoose";

export const connectDB = async (MONGO_URL) => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error :`, error);
    process.exit();
  }
};
