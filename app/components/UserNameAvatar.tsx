"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { User } from "@/utils/types";

interface Props {
  user?: User | null;
  className?: string;
}

const UserNameAvatar = ({
  user = useAppSelector((store) => store.authReducer.user),
  className = "",
}: Props) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Link href="/profile">
      <Image
        src="/avatar.jpg"
        alt="avatar"
        width={40}
        height={40}
        className="h-10 w-10 cursor-pointer rounded-full"
      />
    </Link>
    {user?.username}
  </div>
);
export default UserNameAvatar;
