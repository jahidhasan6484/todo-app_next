"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddTodo = () => {
  const [loading, setLoading] = useState(false);
  const handleAddTodo = async (e) => {
    e.preventDefault();

    const todoName = e.target.todoName.value;
    const description = e.target.description.value;

    const data = {
      todoName,
      description,
    };

    try {
      setLoading(true);

      const response = await axios.post("/api/todo", data);

      toast.success(response.data.message);

      e.target.reset();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container h-screen mx-auto flex justify-center items-center">
      <form onSubmit={handleAddTodo} className="w-full max-w-lg px-4">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Todo name
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name of your todo"
            name="todoName"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Todo description"
            name="description"
            required
            rows="4"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
