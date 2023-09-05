"use client";

import { useState, useEffect, useRef } from "react";
import MessageCard from "@/components/MessageCard";
import { sendMessage } from "@/utils/clientRequests";
import { SERVER_URL } from "@/utils/constants";
import { Message, MessageSendRequest, User, DirectChat } from "@/utils/types";
import SockJS from "sockjs-client";
import { Client, over } from "stompjs";
import { BsEmojiSmile, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

interface Props {
  messages: Message[];
  recipient: User;
  chat: DirectChat;
}

const DirectChatInteractive = (props: Props) => {
  const [sockClient, setSockClient] = useState<Client>();
  const [sockClientConnected, setSockClientConnected] = useState(false);
  const [messages, setMessages] = useState(props.messages);
  const [inputText, setInputText] = useState<string>("");

  const chat = props.chat;
  const recipient = props.recipient;
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Connect to web socket
  useEffect(() => {
    const sock = new SockJS(`${SERVER_URL}/websocket`);
    const client = over(sock);
    setSockClient(client);

    client.connect(
      {},
      () => {
        setSockClient(client);
        setSockClientConnected(true);
      },
      console.log,
    );
  }, []);

  // Subsctibe to web socket
  useEffect(() => {
    if (!sockClientConnected || !sockClient) return;
    const subscription = sockClient.subscribe(
      "/chat/" + chat.chatId,
      (response) => {
        const message: Message = JSON.parse(response.body);
        if (message.senderId !== recipient.id) return; // don't add duplicate message to sender
        setMessages((prev) => [...prev, message]);
      },
    );
    return () => subscription.unsubscribe();
  }, [sockClientConnected]);

  // Smooth scroll on new message
  useEffect(() => {
    if (messages.length == 0 || !chatContainerRef) return;
    const div = chatContainerRef.current;
    if (!div) return;
    div.scrollTop = div.scrollHeight;
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
        // Send message via web socket   }
        sockClient?.send("/app/message", {}, JSON.stringify(message));
      }
      return prev;
    });
  };
  return (
    <>
      <div
        ref={chatContainerRef}
        className="grow overflow-y-scroll bg-blue-200 px-10"
      >
        <div className="mt-20 flex flex-col justify-center gap-1 py-2">
          {messages.map((message, idx) => (
            <MessageCard
              key={idx}
              text={message.text}
              type={message.senderId === recipient.id ? "RECEIVED" : "SENT"}
            />
          ))}
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
            handleSendMessage({ chatId: chat.chatId, text: inputText });
          }}
          className="w-[85%] rounded-md border-none bg-white py-2 pl-4 outline-none"
        />
        <BsMicFill />
      </div>
    </>
  );
};

export default DirectChatInteractive;
