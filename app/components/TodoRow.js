import Link from "next/link";

const TodoRow = ({ todo, index, loading, updateTodo, deleteTodo }) => {
  const { _id, todoName, description, status } = todo;

  return (
    <tr className="bg-white border-b text-sm">
      <td className="px-6 py-4">{index + 1}</td>
      <td className="px-6 py-4 font-medium text-sm whitespace-nowrap">
        {todoName}
      </td>
      <td className="px-6 py-4">
        {description.length > 50
          ? `${description.substring(0, 50)}...`
          : description}
      </td>
      <td className="px-6 py-4">{status}</td>
      <td className="px-6 py-4 flex flex-row">
        {status !== "COMPLETED" && (
          <button
            onClick={() => updateTodo(_id)}
            disabled={loading}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg px-5 py-2.5 me-2 mb-2"
          >
            done
          </button>
        )}
        <button
          onClick={() => deleteTodo(_id)}
          disabled={loading}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-5 py-2.5 me-2 mb-2"
        >
          delete
        </button>
        <Link
          href={`todos/${_id}`}
          disabled={loading}
          type="button"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 rounded-lg px-5 py-2.5 mb-2"
        >
          view
        </Link>
      </td>
    </tr>
  );
};

export default TodoRow;
