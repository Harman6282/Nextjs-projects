import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/lib/validator";
import ErrorReporter from "@/lib/ErrorReporter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validator = vine.compile(registerSchema);

    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    // Check if the email already exists in the database
    const user = await prisma.user.findFirst({
      where: {
        email: output.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Email already exists",
          },
        },
        { status: 200 }
      );
    } else {
      output.password = await bcrypt.hashSync(output.password, 10);

      await prisma.user.create({
        data: {
          name: output.name,
          email: output.email,
          password: output.password,
        },
      });

      return NextResponse.json(
        { status: 200, message: "Account created successfully. Login to your account" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
