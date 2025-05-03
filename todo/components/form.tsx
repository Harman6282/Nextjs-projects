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
      <div className=" w-[500px] h-auto rounded p-3">
        <div className="flex bg-[#F1ECE6] p-3 rounded-md items-center">
          <input
            type="text"
            className="border w-full   border-r-0 rounded-l-md  px-3 py-1 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="bg-black text-white px-3 h-[33px] py-1 rounded-r-md " onClick={addTodo}>
            Add
          </button>
        </div>

        <Listing   todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  );
};

export default Form;
