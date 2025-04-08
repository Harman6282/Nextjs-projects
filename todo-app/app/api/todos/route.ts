import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });

  if (!todos) {
    return NextResponse.json({ message: "No todos found" }, { status: 404 });
  }

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const newTodo = await prisma.todo.create({ data: { title } });
  return NextResponse.json({message: "Todo created successfully", newTodo}, { status: 201 });
}
