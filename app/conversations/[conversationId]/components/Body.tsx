"use client";

import { FullMessageType } from "@/types";

interface BodyProps {
  messages: FullMessageType[];
}

const Body = ({ messages }: BodyProps) => {
  return <div className="flex-1 overflow-y-auto">Body</div>;
};
export default Body;
