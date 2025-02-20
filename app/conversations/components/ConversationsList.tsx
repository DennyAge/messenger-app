"use client";

//core
import { TbUsersPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

interface ConversationsListProps {
  conversations: FullConversationType[];
  users: User[];
}

const ConversationsList = ({
  conversations,
  users,
}: ConversationsListProps) => {
  const [items, setItems] = useState(conversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

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
