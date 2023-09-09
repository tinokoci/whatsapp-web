import Link from "next/link";
import Image from "next/image";
import { getImageLobSrc, formatTimeAgo } from "@/utils/helpers";
import { GroupChat } from "@/utils/types";

interface Props {
  chatPreview: GroupChat;
  onClick?: () => void;
}

const GroupChatCard = ({ chatPreview, onClick }: Props) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const classes =
      "flex cursor-pointer items-center justify-between border-t py-3";
    return onClick ? (
      <div onClick={onClick} className={classes}>
        {children}
      </div>
    ) : (
      <Link href={`/group/${chatPreview.chatId}`} className={classes}>
        {children}
      </Link>
    );
  };
  return (
    <Wrapper>
      <div className="flex gap-4">
        <Image
          src={getImageLobSrc(chatPreview.avatar, "/group.png")}
          alt="avatar"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
        ></Image>
        <div className="flex flex-col justify-between">
          <div className="text-lg">{chatPreview.name}</div>
          <div>Last message preview...</div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-sm">{formatTimeAgo(Date.now())}</div>
            <div className="w-fit self-end rounded-full bg-green-500 px-2 py-1 text-xs text-white">
              0
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default GroupChatCard;
