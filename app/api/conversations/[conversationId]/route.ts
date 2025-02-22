import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/prisma";
import { pusherServer } from "@/lib/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IParams> },
) {
  try {
    const { conversationId } = await params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation,
        );
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.log(error, "ERROR_DELETE_CONVERSATION");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
