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
  const [selectedStatus, setSelectedStatus] = useState("ALL");

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
    return <NotFound message="No todo found of you" />;
  }

  const updateTodo = async (id) => {
    try {
      const response = await axios.patch(`/api/todo?id=${id}`);

      const updatedTodoId = response?.data?.data?._id;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodoId ? { ...todo, status: "COMPLETED" } : todo
        )
      );

      toast.success(response?.data?.data?.message || "Todo is updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`/api/todo?id=${id}`);

      const deletedTodoId = response?.data?.data?._id;

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== deletedTodoId)
      );

      toast.success(response?.data?.data?.message || "Todo is deleted");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = todos.filter(
    (data) => selectedStatus === "ALL" || data.status === selectedStatus
  );

  return (
    <div className="min-h-screen container mx-auto py-6 px-4">
      <div className="py-4 flex flex-row justify-between items-center">
        <h1 className="font-bold">My Todos</h1>

        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
          <li
            onClick={() => setSelectedStatus("ALL")}
            className={`me-2 cursor-pointer inter inline-block p-4 rounded-lg ${
              selectedStatus === "ALL"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600  hover:bg-gray-50"
            }`}
          >
            All
          </li>
          <li
            onClick={() => setSelectedStatus("PENDING")}
            className={`me-2 cursor-pointer inter inline-block p-4 rounded-lg ${
              selectedStatus === "PENDING"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600  hover:bg-gray-50"
            }`}
          >
            Pending
          </li>
          <li
            onClick={() => setSelectedStatus("COMPLETED")}
            className={`me-2 cursor-pointer inter inline-block p-4 rounded-lg ${
              selectedStatus === "COMPLETED"
                ? "text-blue-600 bg-gray-100"
                : "hover:text-gray-600  hover:bg-gray-50"
            }`}
          >
            Completed
          </li>
        </ul>
      </div>
      {filteredTodos.length > 0 ? (
        <table className="w-full text-sm text-left">
          <thead className="text-sm uppercase bg-gray-50">
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
            {filteredTodos.map((todo, index) => (
              <TodoRow
                key={index}
                todo={todo}
                index={index}
                loading={loading}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center font-bold py-6">
          There is no {selectedStatus.toLowerCase()} todos
        </div>
      )}
    </div>
  );
};

export default Todos;
