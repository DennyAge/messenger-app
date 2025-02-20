import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/prisma";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { name, image } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "SETTINGS_ERROR");
    return new NextResponse("Internal error", { status: 500 });
  }
}
