import bcrypt from "bcrypt";

import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    if (!user) {
      return new NextResponse("User creation failed", { status: 500 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "SING-UP ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
