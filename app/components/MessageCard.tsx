import { MessageType } from "@/utils/types";

interface Props {
  text: string;
  type: MessageType;
  failed?: boolean;
}

const MessageCard = ({ text, type, failed }: Props) => {
  const alignmentClass = type == "RECEIVED" ? "self-start" : "self-end";
  const colorClass = failed
    ? "bg-red-500"
    : type == "RECEIVED"
    ? "bg-white"
    : "bg-[#d9fdd3]";
  return (
    <div
      className={`max-w-1/2 rounded-md px-2 py-2 ${alignmentClass} ${colorClass}`}
    >
      {text}
    </div>
  );
};

export default MessageCard;
