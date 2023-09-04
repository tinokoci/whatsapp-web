import Link from "next/link";
import Image from "next/image";
import { DirectChat } from "@/utils/types";

interface Props {
  chatPreview: DirectChat;
}

const ChatCard = ({ chatPreview }: Props) => (
  <Link
    href={`/direct/${chatPreview.recipientId}`}
    className="flex cursor-pointer items-center justify-between border-t  py-3 "
  >
    <div className="flex gap-4">
      <Image
        src={
          chatPreview.avatar ||
          `https://live.staticflickr.com/2413/2494908876_e196f3ea40_b.jpg`
        }
        alt="avatar"
        width={56}
        height={56}
        className="h-14 w-14 rounded-full"
      ></Image>
      <div className="flex flex-col justify-between">
        <div className="text-lg">{chatPreview.name}</div>
        <div>
          {chatPreview.latestMessageText || "Be the first to message! 🎉"}
        </div>
      </div>
    </div>
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-x-2">
          <div className="text-sm"> timestamp</div>
          <div className="w-fit self-end rounded-full bg-green-500 px-2 py-1 text-xs text-white">
            5
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default ChatCard;
