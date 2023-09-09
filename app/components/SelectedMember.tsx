import Image from "next/image";
import { getImageLobSrc } from "@/utils/helpers";
import { AiOutlineClose } from "react-icons/ai";
import { DirectChat, User } from "@/utils/types";

interface Props {
  member: DirectChat;
  handleRemoveMember: () => void;
}

const SelectedMember = ({ member, handleRemoveMember }: Props) => {
  return (
    <div className="flex items-center rounded-full bg-slate-300">
      <Image
        src={getImageLobSrc(member.avatar, "/avatar.jpg")}
        alt="avatar"
        width={28}
        height={28}
        className="h-7 w-7 rounded-full"
      />
      <div className="px-2">{member.name}</div>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="cursor-pointer pr-1"
      />
    </div>
  );
};

export default SelectedMember;
