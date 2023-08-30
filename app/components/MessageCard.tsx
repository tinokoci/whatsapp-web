import { MessageType } from "@/utils/types";

interface Props {
  text: string;
  type: MessageType;
}

const MessageCard = ({ text, type }: Props) => {
  const classForType =
    type == "RECEIVED" ? "self-start bg-white" : "self-end bg-[#d9fdd3]";
  return (
    <div className={`max-w-1/2 rounded-md px-2 py-2 ${classForType}`}>
      {text}
    </div>
  );
};

export default MessageCard;
