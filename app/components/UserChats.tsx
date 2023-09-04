"use client";

import { useAppSelector } from "@/redux/hooks";
import ChatCard from "@/components/ChatCard";

const UserChats = () => {
  const searchChatPreviews = useAppSelector(
    (store) => store.chatReducer.searchChatPreviews,
  );
  const userChatPreviews = useAppSelector(
    (store) => store.chatReducer.userChatPreviews,
  );

  return (
    <div className="grow overflow-y-scroll bg-white px-3">
      {(searchChatPreviews.length > 0
        ? searchChatPreviews
        : userChatPreviews
      ).map((chatPreview, idx) => (
        <ChatCard key={idx} chatPreview={chatPreview} />
      ))}
    </div>
  );
};

export default UserChats;
