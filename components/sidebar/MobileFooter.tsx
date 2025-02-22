"use client";

//hooks
import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
//components
import MobileItem from "@/components/sidebar/MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          icon={route.icon}
          onClick={route.onClick}
          active={route.active}
        />
      ))}
    </div>
  );
};
export default MobileFooter;
