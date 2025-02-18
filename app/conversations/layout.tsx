//core
import { ReactNode } from "react";
//components
import ConversationsList from "@/app/conversations/components/ConversationsList";
import Sidebar from "@/components/sidebar/Sidebar";
//actions
import getConversations from "@/actions/getConversations";

const ConversationsLayout = async ({ children }: { children: ReactNode }) => {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList conversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};
export default ConversationsLayout;
