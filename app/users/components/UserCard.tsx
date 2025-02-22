"use client";

//core
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
//types
import { User } from "@prisma/client";
//components
import Avatar from "@/components/Avatar";
import LoadingModal from "@/app/conversations/components/LoadingModal";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [user, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-primary/10 rounded-lg transition cursor-pointer"
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900"> {user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCard;
