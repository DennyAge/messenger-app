import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationsList from "@/app/conversations/components/ConversationsList";

const ConversationsLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationsList initialItems={[]} />
        {children}
      </div>
    </Sidebar>
  );
};
export default ConversationsLayout;
