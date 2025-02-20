"use client";

//core
import { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
//types
import { FullConversationType } from "@/types";
//hooks
import useOtherUser from "@/hooks/useOtherUser";
//helpers
import { cn } from "@/lib/utils";
//components
import AvatarGroup from "@/components/AvatarGroup";
import Avatar from "@/components/Avatar";

interface ConversationCardProps {
  conversation: FullConversationType;
  selected: boolean;
}

const ConversationCard = ({
  conversation,
  selected,
}: ConversationCardProps) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const message = conversation.messages || [];

    return message[message.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        `w-full relative flex items-center space-x-3 hover:bg-primary/10 rounded-lg
        transition cursor-pointer p-3`,
        selected ? "bg-primary/10" : "bg-white",
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup users={conversation.users} />
      ) : (
        <Avatar user={otherUser} />
      )}

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={cn(
              `text-sm truncate`,
              hasSeen ? "text-gray-500" : "text-black font-medium ",
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ConversationCard;
