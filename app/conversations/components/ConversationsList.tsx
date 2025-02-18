"use client";

//types
import { FullConversationType } from "@/types";

interface ConversationsListProps {
  conversations: FullConversationType[];
}

const ConversationsList = ({ conversations }: ConversationsListProps) => {
  return <div>ConversationsList</div>;
};
export default ConversationsList;
