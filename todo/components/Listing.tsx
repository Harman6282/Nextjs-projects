"use client";
import axios from "axios";
import { CheckSquare, Square, Trash2 } from "lucide-react";
import { useEffect } from "react";

type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  cretedAt: Date;
};
const Todo = ({
  todo,
  onToggle,
  onDelete,
}: {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="p-2 border-b justify-between items-center  border-gray-600 flex ">
      <div className="flex gap-2">
        {" "}
        {todo.completed ? (
          <CheckSquare
            className="cursor-pointer"
            onClick={() => onToggle(todo.id)}
          />
        ) : (
          <Square
            className="cursor-pointer"
            onClick={() => onToggle(todo.id)}
          />
        )}
        <span className="font-mono ">{todo.title}</span>
      </div>
      <Trash2 className="cursor-pointer" onClick={() => onDelete(todo.id)} />
    </div>
  );
};

const Listing = ({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) => {
  const getTodos = async () => {
    const res = await axios.get("http://localhost:3000/api/todos");

    setTodos(res.data.todos);
    return res.data;
  };

  const onToggle = async (id: string) => {

    await axios.patch(`http://localhost:3000/api/todos/${id}`);

    setTodos((prev) =>
      prev.map((todo: TodoType) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const onDelete = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    getTodos();
  }, []);

  
  return (
    <div className="mt-4 bg-[#F1ECE6] p-3 rounded">
      {todos.map((todo: TodoType) => (
        <Todo
          key={todo.id ?? todo.title + Math.random()}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Listing;
