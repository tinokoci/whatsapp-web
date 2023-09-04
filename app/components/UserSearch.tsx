"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchChatPreviews } from "@/redux/reducers/chat";
import { searchDirectChatsByUsername } from "@/utils/clientRequests";
import { BsFilter } from "react-icons/bs";

const UserSearch = () => {
  const dispatch = useAppDispatch();

  const handleSearch = async (value: string) => {
    if (!value) {
      dispatch(setSearchChatPreviews([]));
      return;
    }
    const data = (await searchDirectChatsByUsername(value)) || [];
    dispatch(setSearchChatPreviews(data));
  };

  // On route switch (eg. / -> /direct/{chat_id}) clear the search previews
  useEffect(() => {
    dispatch(setSearchChatPreviews([]));
  }, []);

  return (
    <div className="flex items-center justify-center bg-white px-3 py-4">
      <input
        type="text"
        placeholder="Search or start new Chat"
        className="w-11/12 rounded-md border-none bg-slate-200 py-2 pl-9 outline-none"
        onChange={(event) => handleSearch(event.target.value)}
      />
      <BsFilter className="ml-4 text-3xl" />
    </div>
  );
};

export default UserSearch;
