"use client";

//core
import { useEffect, useMemo, useState } from "react";
import { TbUsersPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
//types
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
//hooks
import useConversation from "@/hooks/useConversation";
//helpers
import { cn } from "@/lib/utils";
//components
import ConversationCard from "@/app/conversations/components/ConversationCard";
import GroupChatModal from "@/app/conversations/components/GroupChatModal";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface ConversationsListProps {
  conversations: FullConversationType[];
  users: User[];
}

const ConversationsList = ({
  conversations,
  users,
}: ConversationsListProps) => {
  const session = useSession();
  const [items, setItems] = useState(conversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };
    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        }),
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((item) => item.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={cn(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? "hidden" : "block w-full left-0 ",
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:text-primary hover:bg-primary/10 transition"
            >
              <TbUsersPlus size={20} />
            </div>
          </div>

          {items.map((item) => (
            <ConversationCard
              key={item.id}
              conversation={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
export default ConversationsList;
