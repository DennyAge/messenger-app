"use client";

//types
import { User } from "@prisma/client";
import UserCard from "@/components/UserCard";

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps) => {
  console.log(users);
  return (
    <aside
      className="fixed inside-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block
    overflow-y-auto border-r border-gray-200 block w-full left-0"
    >
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4"> Users</div>
        </div>
        {users.length &&
          users.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </aside>
  );
};
export default UsersList;
