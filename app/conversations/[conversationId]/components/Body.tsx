"use client";

//core
import { useRef, useState, useEffect } from "react";
import axios from "axios";
//types
import { FullMessageType } from "@/types";
//hooks
import useConversation from "@/hooks/useConversation";
//components
import MessageCard from "@/app/conversations/[conversationId]/components/MessageCard";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageCard
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}

      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};
export default Body;
