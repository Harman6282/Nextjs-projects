'use client'

import { useEffect, useState } from "react"

type Todo = {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  const addTodo = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    })
    const newTodo = await res.json()
    setTodos([newTodo, ...todos])
    setTitle("")
  }

  const toggleCompleted = async (id: string, completed: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !completed }),
    })
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo))
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" })
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2">Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center py-2">
            <span
              onClick={() => toggleCompleted(todo.id, todo.completed)}
              className={todo.completed ? "line-through cursor-pointer" : "cursor-pointer"}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
