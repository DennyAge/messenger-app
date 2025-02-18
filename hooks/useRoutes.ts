//core
import { HiArrowLeftEndOnRectangle, HiOutlineUsers } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { TbMessage } from "react-icons/tb";
import { signOut } from "next-auth/react";
import { useMemo } from "react";
//hooks
import useConversation from "@/hooks/useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: TbMessage,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiOutlineUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftEndOnRectangle,
      },
    ],
    [pathname, conversationId],
  );
  return routes;
};

export default useRoutes;
