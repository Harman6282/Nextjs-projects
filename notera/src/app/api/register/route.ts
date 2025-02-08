import { prisma } from "@/lib/prismaClient";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("All fields required", { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exist) {
      return new NextResponse("User already exist with this email", {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Error while registering", { status: 500 });
  }
}
