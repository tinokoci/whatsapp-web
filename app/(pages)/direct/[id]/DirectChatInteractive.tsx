"use client";

import { useState, useEffect, useRef } from "react";
import MessageCard from "@/components/MessageCard";
import { sendMessage } from "@/utils/clientRequests";
import { Message, MessageSendRequest, User, DirectChat } from "@/utils/types";
import { BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

interface Props {
  messages: Message[];
  recipient: User;
  chat: DirectChat;
}

const DirectChatInteractive = (props: Props) => {
  const [messages, setMessages] = useState(props.messages);
  const [inputText, setInputText] = useState<string>("");

  const recipient = props.recipient;
  const belowLastMessageRef = useRef<HTMLDivElement>(null);

  // Smooth scroll on new message
  useEffect(() => {
    if (messages.length == 0 || !belowLastMessageRef) return;
    belowLastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  // Send message
  const handleSendMessage = async (request: MessageSendRequest) => {
    // Push dummy message for instant display on screen
    const index = messages.length;
    messages.push({
      senderId: index.toString(),
      text: inputText,
      timestamp: new Date().getMilliseconds(),
    });
    setInputText("");
    const message = await sendMessage(request);

    setMessages((prev) => {
      if (message === null) {
        // Mark message if it failed to send
        prev[index].failedToSend = true;
      } else {
        // Replace dummy message with the actual message
        prev[index] = message;
      }
      return prev;
    });
  };
  return (
    <>
      <div className="grow overflow-y-scroll bg-blue-200 px-10">
        <div className="mt-20 flex flex-col justify-center gap-1 py-2">
          {messages.map((message, idx) => (
            <MessageCard
              key={idx}
              text={message.text}
              type={message.senderId === recipient.id ? "RECEIVED" : "SENT"}
            />
          ))}
          <div ref={belowLastMessageRef} />
        </div>
      </div>
      <div className="flex items-center justify-between bg-[f0f2f5] px-5 py-3 text-2xl">
        <div className="flex gap-5">
          <BsEmojiSmile className="cursor-pointer" />
          <ImAttachment />
        </div>
        <input
          type="text"
          placeholder="Type message"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || !inputText) return;
            handleSendMessage({ chatId: props.chat.chatId, text: inputText });
          }}
          className="w-[85%] rounded-md border-none bg-white py-2 pl-4 outline-none"
        />
        <BsMicFill />
      </div>
    </>
  );
};

export default DirectChatInteractive;
