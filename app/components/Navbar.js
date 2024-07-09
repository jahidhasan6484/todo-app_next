import Link from "next/link";

const Navbar = () => {
  return (
    <div className="container mx-auto flex flex-row justify-between py-4 px-4">
      <div>
        <Link href={"/"}>
          <h1 className="font-bold text-xl">Todo App</h1>
        </Link>
      </div>
      <ul className="flex flex-row gap-4 text-sm justify-center items-end">
        <Link href={"todos"}>
          <li className="cursor-pointer">Todos</li>
        </Link>
        <Link href={"add-todo"}>
          <li className="cursor-pointer">Add Todo</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
