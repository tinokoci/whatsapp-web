import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  member: string;
  handleRemoveMember: () => void;
}

const SelectedMember = ({ member, handleRemoveMember }: Props) => {
  return (
    <div className="flex items-center rounded-full bg-slate-300">
      <Image
        src="/avatar.jpg"
        alt="avatar"
        width={28}
        height={28}
        className="h-7 w-7 rounded-full"
      />
      <div className="px-2">{member}</div>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="cursor-pointer pr-1"
      />
    </div>
  );
};

export default SelectedMember;
