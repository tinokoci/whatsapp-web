import { Chat, User } from "@/utils/types";
import { AiOutlineSearch } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import UserNameAvatar from "@/components/UserNameAvatar";

const ChatHeader = ({ entity }: { entity: User | Chat }) => {
  return (
    <div className="w-full bg-[#f0f2f5]">
      <div className="flex justify-between">
        <div className="p-3">
          <UserNameAvatar entity={entity} />
        </div>
        <div className="flex items-center gap-4 px-3 py-3">
          <AiOutlineSearch />
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
