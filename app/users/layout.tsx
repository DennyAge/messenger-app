import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};
export default UserLayout;
