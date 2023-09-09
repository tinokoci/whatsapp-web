"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { getImageLobSrc } from "@/utils/helpers";
import { GroupChat, User } from "@/utils/types";

interface Props {
  entity?: User | GroupChat | null;
  className?: string;
}

const UserNameAvatar = ({
  entity = useAppSelector((store) => store.authReducer.user),
  className = "",
}: Props) => {
  const user = entity as User;
  const group = entity as GroupChat;
  const displayName = user.username || group.name;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Link href="/profile">
        <Image
          src={getImageLobSrc(entity?.avatar, "/avatar.jpg")}
          alt="avatar"
          width={40}
          height={40}
          className="h-10 w-10 cursor-pointer rounded-full"
        />
      </Link>
      {displayName}
    </div>
  );
};
export default UserNameAvatar;
