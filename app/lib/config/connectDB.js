import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo_app");
  } catch (error) {
    console.log("Failed to connect with database");
  }
};
