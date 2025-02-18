//core
import { ReactNode } from "react";
//actions
import getUsers from "@/actions/getUsers";
//components
import Sidebar from "@/components/sidebar/Sidebar";
import UsersList from "@/components/UsersList";

const UserLayout = async ({ children }: { children: ReactNode }) => {
  const users = await getUsers();

  return (
    <Sidebar>
      <UsersList users={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};
export default UserLayout;
