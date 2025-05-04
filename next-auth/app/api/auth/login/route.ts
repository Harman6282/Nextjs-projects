import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { loginSchema } from "@/lib/validator";
import ErrorReporter from "@/lib/ErrorReporter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    const user = await prisma.user.findFirst({
      where: {
        email: output.email,
      },
    });

    if (user) {
        const checkPassword = await bcrypt.compareSync(output.password, user.password)

        if(!checkPassword){
            return NextResponse.json(
                { status: 200, message: "Invalid Password" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { status: 200, message: "User logged in" },
            { status: 200 }
        );
    }

    return NextResponse.json(
      {
        status: 404,
        errors: {
          email: "User not found",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 422, error: error.messages },
        { status: 200 }
      );
    }
  }
}
