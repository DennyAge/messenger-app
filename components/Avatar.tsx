"use client";

//core
import Image from "next/image";
//types
import { User } from "next-auth";

interface AvatarProps {
  user: User;
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user?.image || "images/user-circle.svg"}
          alt="avatar"
          fill
        />
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white bottom-2 right-0 h-2 w-2 md:h-3 md:w-3" />
    </div>
  );
};
export default Avatar;
