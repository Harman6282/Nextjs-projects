"use client";

import { useState } from "react";
import Listing from "./Listing";
import axios from "axios";

type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  cretedAt: Date;
};

const Form = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState("");


  const addTodo = async () => {
    const res = await axios.post("http://localhost:3000/api/todos", {
      title,
    });
    setTodos([ res.data.todo, ...todos]);
    setTitle("");
  };


  return (
    <div>
      <div className=" bg-gray-800 w-auto h-auto rounded p-3">
        <div className="flex items-center">
          <input
            type="text"
            className="border   border-r-0 rounded-l-2xl  px-3 py-1 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-2 h-[33px] py-1 rounded-r" onClick={addTodo}>
            Add
          </button>
        </div>

        <Listing   todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  );
};

export default Form;
