"use client";

import { useAppSelector } from "@/redux/hooks";
import DirectChatCard from "@/components/DirectChatCard";
import GroupChatCard from "./GroupChatCard";

const UserChats = () => {
  const searchChatPreviews = useAppSelector(
    (store) => store.chatReducer.searchChatPreviews,
  );
  const userChatPreviews = useAppSelector(
    (store) => store.chatReducer.userChatPreviews,
  );
  const userGroupPreviews = useAppSelector(
    (store) => store.chatReducer.userGroupPreviews,
  );

  return (
    <div className="grow overflow-y-scroll bg-white px-3">
      {userGroupPreviews.map((chatPreview, idx) => (
        <GroupChatCard key={idx} chatPreview={chatPreview} />
      ))}
      {(searchChatPreviews.length > 0
        ? searchChatPreviews
        : userChatPreviews
      ).map((chatPreview, idx) => (
        <DirectChatCard key={idx} chatPreview={chatPreview} />
      ))}
    </div>
  );
};

export default UserChats;
