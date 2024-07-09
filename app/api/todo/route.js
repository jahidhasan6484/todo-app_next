import { connectDB } from "@/app/lib/config/connectDB";
import TodoModel from "@/app/lib/models/TodoModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};

loadDB();

export async function POST(request) {
  try {
    const { todoName, description } = await request.json();

    const newTodo = TodoModel({
      todoName,
      description,
    });

    await newTodo.save();

    return NextResponse.json({
      message: "Todo added",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to add todo" });
  }
}

export async function GET(request) {
  try {
    const todos = await TodoModel.find({});

    return NextResponse.json({
      data: todos,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" });
  }
}
