"use client";

import Loading from "@/app/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TodoDetails = ({ params }) => {
  const id = params.id;
  const [todoDetails, setTodoDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/todo?id=${id}`);

        setTodoDetails(response?.data?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchTodoDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center">
      <div className="w-full max-w-2xl border-gray-200 shadow rounded-lg p-5">
        <h2 className="font-bold mb-2">Todo Details</h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 gap-4 text-sm">
          <div className="flex flex-row gap-2">
            <p className="font-bold">Name:</p>
            <p className="break-all">{todoDetails?.todoName}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">Description:</p>
            <p className="break-all">{todoDetails?.description}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-bold">Task Status:</p>
            <p className="break-all">{todoDetails?.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;
