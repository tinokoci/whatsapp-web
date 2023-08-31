"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import FallbackWindow from "@/components/modules/FallbackWindow";
import MessageCard from "@/components/MessageCard";
import {
  getOrCreateDirectChat,
  sendDirectMessage,
  getChatMessages,
} from "@/utils/requests";
import { Chat, Message, MessageSendRequest } from "@/utils/types";
import { BsThreeDotsVertical, BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";

const fetchDirectChat = async (receiverId: string): Promise<Chat | null> => {
  return await getOrCreateDirectChat({ receiverId });
};

const fetchChatMessages = async (
  receiverId: string,
): Promise<Message[] | null> => {
  return await getChatMessages(receiverId);
};

const DirectChatWindow = () => {
  const senderId = useAppSelector((store) => store.authReducer.id);
  const receiverId = useAppSelector(
    (store) => store.chatReducer.activeEntityId,
  );
  const isSelfChat = senderId === receiverId;
  const belowLastMessageRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (isSelfChat) return;
    Promise.all([
      fetchDirectChat(receiverId),
      fetchChatMessages(receiverId),
    ]).then((values) => {
      const [fetchedChat, fetchedMessages] = values;
      setChat(fetchedChat);
      if (fetchedMessages) {
        setMessages(fetchedMessages);
      }
    });
  }, [receiverId]);

  useEffect(() => {
    if (!messages.length || !belowLastMessageRef) return; // messages.length === 0 (falsy check)
    belowLastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length]);

  const handleSendMessage = async (request: MessageSendRequest) => {
    // Push dummy message for instant display on screen
    const index = messages.length;
    messages.push({
      senderId: index.toString(),
      text: inputText,
      timestamp: new Date().getMilliseconds(),
    });
    setInputText("");
    const message = await sendDirectMessage(request);

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

  if (chat == null || messages == null || isSelfChat) {
    return <FallbackWindow />;
  }

  return (
    <div className="flex w-[70%] flex-col">
      {/* Header */}
      <div className="w-full bg-[#f0f2f5]">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 px-3 py-3">
            <Image
              src={chat.avatar || "/avatar.jpg"}
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 cursor-pointer rounded-full"
            />
            <div>{chat.id}</div>
          </div>
          <div className="flex items-center space-x-4 px-3 py-3">
            <AiOutlineSearch />
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="grow overflow-y-scroll bg-blue-200 px-10">
        <div className="mt-20 flex flex-col justify-center space-y-1 py-2">
          {messages.map((message, idx) => (
            <MessageCard
              key={idx}
              text={message.text}
              type={message.senderId === receiverId ? "RECEIVED" : "SENT"}
            />
          ))}
          <div ref={belowLastMessageRef} />
        </div>
      </div>
      {/* Input */}
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
            handleSendMessage({ entityId: receiverId, text: inputText });
          }}
          className="w-[85%] rounded-md border-none bg-white py-2 pl-4 outline-none"
        />
        <BsMicFill />
      </div>
    </div>
  );
};

export default DirectChatWindow;
