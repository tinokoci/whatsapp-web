"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setUsers } from "@/redux/reducers/chat";
import { searchUsers } from "@/utils/requests";
import { User } from "@/utils/types";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";

const ChatSearch = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState<string>("");
  const [usersFoundInSearch, setUsersFoundInSearch] = useState<User[]>([]);

  const handleSearch = async (value: string) => {
    if (!value) {
      setUsersFoundInSearch([]);
      return;
    }
    const fetchedUsers = (await searchUsers(value)) || [];
    setUsersFoundInSearch(fetchedUsers);
    dispatch(setUsers(fetchedUsers));
  };

  return (
    <div className="flex items-center justify-center bg-white px-3 py-4">
      <input
        type="text"
        placeholder="Search or start new Chat"
        className="w-11/12 rounded-md border-none bg-slate-200 py-2 pl-9 outline-none"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          handleSearch(event.target.value);
        }}
      />
      <BsFilter className="ml-4 text-3xl" />
    </div>
  );
};

export default ChatSearch;
