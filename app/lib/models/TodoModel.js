import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    todoName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
