"use client";

//core
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { useState } from "react";
import Image from "next/image";
//types
import { FullMessageType } from "@/types";
//helpers
import { cn } from "@/lib/utils";
//components
import ImageModal from "@/app/conversations/[conversationId]/components/ImageModal";
import Avatar from "@/components/Avatar";

interface MessageCardProps {
  isLast?: boolean;
  data: FullMessageType;
}

const MessageCard = ({ isLast, data }: MessageCardProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = cn("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = cn(isOwn && "order-2");
  const body = cn("flex flex-col gap-2", isOwn && "items-end");
  const message = cn(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-primary/60 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
  );

  return (
    <>
      <ImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        src={data.image}
      />
      <div className={container}>
        <div className={avatar}>
          <Avatar user={data.sender} />
        </div>
        <div className={body}>
          <div className="flex items-center gap-1">
            <div className="text-sm text-gray-500">{data.sender.name}</div>
            <div className="text-xs text-gray-400">
              {format(new Date(data.createdAt), "p")}
            </div>
          </div>
          <div className={message}>
            {data.image ? (
              <Image
                onClick={() => setImageModalOpen(true)}
                alt="Image"
                width="288"
                height="288"
                src={data.image}
                className="object-cover cursor-pointer hover:scale-110 transition translate"
              />
            ) : (
              <div>{data.body}</div>
            )}
          </div>
          {isLast && isOwn && seenList.length > 0 && (
            <div className="text-xs font-light text-gray-500">{`Seen By ${seenList}`}</div>
          )}
        </div>
      </div>
    </>
  );
};
export default MessageCard;
