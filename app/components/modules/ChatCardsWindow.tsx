"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveEntityId } from "@/redux/reducers/chat";
import ChatCard from "../ChatCard";
import { Chat, User } from "@/utils/types";
import { getAllChatsOfUser } from "@/utils/requests";

const findAllChatsOfUser = async (): Promise<User[] | null> => {
  return await getAllChatsOfUser();
};

const ChatCardsWindow = () => {
  const [activeChats, setActiveChats] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const usersFromSearch = useAppSelector((store) => store.chatReducer.users);

  useEffect(() => {
    findAllChatsOfUser().then((fetchedActiveChats) => {
      if (fetchedActiveChats == null) return;
      setActiveChats(fetchedActiveChats);
    });
  }, []);
  return (
    <div className="grow overflow-y-scroll bg-white">
      {(usersFromSearch.length != 0 ? usersFromSearch : activeChats).map(
        (user, idx) => (
          <ChatCard
            key={idx}
            user={user}
            onClick={() => {
              dispatch(setActiveEntityId(user.id));
            }}
          />
        ),
      )}
    </div>
  );
};

export default ChatCardsWindow;
