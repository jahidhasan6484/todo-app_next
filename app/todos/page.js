"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import TodoRow from "../components/TodoRow";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/todo");
        setTodos(response?.data?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!loading && todos.length < 1) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen container mx-auto py-6 px-4">
      <h1 className="font-bold py-4">My Todos</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SL
            </th>
            <th scope="col" className="px-6 py-3">
              Todo Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo, index) => {
            return <TodoRow key={index} todo={todo} index={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Todos;
