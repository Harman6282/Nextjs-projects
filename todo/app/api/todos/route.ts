import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { title } = await req.json();

  if (!title) {
    return NextResponse.json({
      success: false,
      message: "Title is required",
    });
  }

  const todo = await prisma.todo.create({
    data: {
      title,
    },
  });

  return NextResponse.json({
    todo,
    success: true,
    message: "Todo added successfully",
  });
};


export const GET = async () => {
  const todos = await prisma.todo.findMany({
    orderBy:{
      cretedAt: "desc"
    }
  });
  return NextResponse.json({
    success: true,
    message: "Todos fetched successfully",
    todos,
  });
};

