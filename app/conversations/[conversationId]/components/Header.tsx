"use client";

//core
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { PiArrowCircleLeftThin } from "react-icons/pi";
import { useMemo, useState } from "react";
import Link from "next/link";
//types
import { Conversation, User } from "@prisma/client";
//hooks
import useOtherUser from "@/hooks/useOtherUser";
//components
import ProfileDrawer from "@/app/conversations/[conversationId]/components/ProfileDrawer";
import Avatar from "@/components/Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-primary/60 hover:text-primary transition cursor-pointer"
          >
            <PiArrowCircleLeftThin size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <IoEllipsisHorizontalOutline
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-primary/60 hover:text-primary transition cursor-pointer"
        />
      </div>
    </>
  );
};
export default Header;
