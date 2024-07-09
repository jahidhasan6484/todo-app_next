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
    return NextResponse.json({ message: "Failed to add todo" });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const todo = await TodoModel.findById(id);
      if (!todo) {
        return NextResponse.json({ message: "Todo not found" });
      }
      return NextResponse.json({ data: todo });
    } else {
      const todos = await TodoModel.find({});
      return NextResponse.json({
        data: todos,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const updatedTodo = await TodoModel.findByIdAndUpdate(id, {
      $set: {
        status: "COMPLETED",
      },
    });

    return NextResponse.json({ data: updatedTodo, message: "Todo is updated" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    return NextResponse.json({ data: deletedTodo, message: "Todo is deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" });
  }
}
