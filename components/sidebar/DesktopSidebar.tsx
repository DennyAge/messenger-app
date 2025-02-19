"use client";

//core
import { useState } from "react";
//hooks
import useRoutes from "@/hooks/useRoutes";
//types
import { User } from "@prisma/client";
//components
import DesktopItem from "@/components/sidebar/DesktopItem";
import Avatar from "@/components/Avatar";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20
  xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col
  justify-between"
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((route) => (
            <DesktopItem
              key={route.label}
              label={route.label}
              icon={route.icon}
              href={route.href}
              active={route.active}
              onClick={route.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col items-center justify-between">
        <div
          className="cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};
export default DesktopSidebar;
