import Image from "next/image";
import { getImageLobSrc } from "@/utils/helpers";
import { User } from "@/utils/types";

interface Props {
  user: User;
  text: string;
  onClick?: () => void;
}

const UserCard = ({ user, text, onClick = () => {} }: Props) => (
  <div
    onClick={onClick}
    className="flex cursor-pointer items-center justify-between border-t py-3 "
  >
    <div className="flex gap-4">
      <Image
        src={getImageLobSrc(user.avatar, "/avatar.jpg")}
        alt="avatar"
        width={56}
        height={56}
        className="h-14 w-14 rounded-full"
      ></Image>
      <div className="flex flex-col justify-between">
        <div className="text-lg">{user.username}</div>
        <div className="italic">{text}</div>
      </div>
    </div>
  </div>
);

export default UserCard;
