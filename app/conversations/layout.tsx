//core
import { ReactNode } from "react";
//components
import ConversationsList from "@/app/conversations/components/ConversationsList";
import Sidebar from "@/components/sidebar/Sidebar";
//actions
import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";

const ConversationsLayout = async ({ children }: { children: ReactNode }) => {
  const conversations = await getConversations();

  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList conversations={conversations} users={users} />
        {children}
      </div>
    </Sidebar>
  );
};
export default ConversationsLayout;
