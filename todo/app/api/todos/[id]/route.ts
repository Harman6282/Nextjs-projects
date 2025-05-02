import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { title, completed } = await req.json();
  const { id } = await params;
  
  if (!id) {
    return NextResponse.json({
      success: false,
      message: "Id is required",
    });
  }
  if (!title) {
    return NextResponse.json({
      success: false,
      message: "Title is required",
    });
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      completed,
    },
  });

  if (!todo) {
    return NextResponse.json({
      success: false,
      message: "Todo not found",
    });
  }

  return NextResponse.json({
    todo,
    success: true,
    message: "Todo updated successfully",
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "Id is required",
    });
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json({
      success: false,
      message: "Todo not found",
    });
  }

  const deleted = await prisma.todo.delete({
    where: {
      id,
    },
  });

  if (!todo) {
    return NextResponse.json({
      success: false,
      message: "Todo not found",
    });
  }

  return NextResponse.json({
    deleted,
    success: true,
    message: "Todo deleted successfully",
  });
};
