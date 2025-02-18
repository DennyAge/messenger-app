"use client";

//hooks
import useConversation from "@/hooks/useConversation";
//components
import EmptyState from "@/components/EmptyState";
//helpers
import { cn } from "@/lib/utils";

const ConversationsPage = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={cn(`lg:pl-80 h-full lg:block`, isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};
export default ConversationsPage;
