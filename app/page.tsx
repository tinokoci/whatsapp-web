"use client";

import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ChatCard from "@/components/ChatCard";
import LogoutButton from "@/components/LogoutButton";
import MessageCard from "@/components/MessageCard";
import WelcomeCard from "@/components/WelcomeCard";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import {
  BsFilter,
  BsThreeDotsVertical,
  BsEmojiSmile,
  BsMicFill,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { Button, Menu, MenuItem } from "@mui/material";

const Home: NextPage = () => {
  const username = useAppSelector((store) => store.authReducer.username);
  const [currentChat, setCurrentChat] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");

  const handleSearch = (value: string) => {};

  const handleClickOnChatCard = (username: string) => {
    setCurrentChat(username);
  };

  const handleCreateNewMessage = () => {};

  // MUI
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //

  return (
    <ProtectedRoute type="PROTECTED">
      <div className="relative w-full bg-[#00a884] py-14"></div>
      <div className="absolute left-1/2 top-6 mx-auto flex h-[95%] w-11/12 -translate-x-1/2 bg-[#f0f2f5]">
        <div className="flex w-full">
          {/* LEFT */}
          <div className="flex h-full w-[30%] flex-col bg-[#e8e9ec]">
            {/* User Bar */}
            <div className="flex items-center p-3">
              {/* Avatar & Username */}
              <div className="flex grow items-center gap-2">
                <Link href="/profile">
                  <Image
                    src="/avatar.jpg"
                    alt="avatar"
                    width={40}
                    height={40}
                    className="h-10 w-10 cursor-pointer rounded-full"
                  />
                </Link>
                <div>{username}</div>
              </div>
              {/* Buttons */}
              <div className="flex space-x-3 text-2xl">
                <Link href="/status">
                  <TbCircleDashed />
                </Link>
                <BiCommentDetail />
                <BsThreeDotsVertical
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="cursor-pointer"
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <Link href="/create-group">
                    <MenuItem>Create Group</MenuItem>
                  </Link>
                  <MenuItem>
                    <LogoutButton />
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* Search */}
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
            {/* Chats */}
            <div className="grow overflow-y-scroll bg-white">
              {["tino", "tinodi", "ide", "ideee", "boo"]
                .filter((username) => query && username.startsWith(query))
                .map((username, idx) => (
                  <ChatCard
                    key={idx}
                    username={username}
                    onClick={() => handleClickOnChatCard(username)}
                  />
                ))}
            </div>
          </div>
          {/* RIGHT */}
          {!currentChat && <WelcomeCard />}
          {currentChat && (
            <div className="flex w-[70%] flex-col">
              {/* Header */}
              <div className="w-full bg-[#f0f2f5]">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4 px-3 py-3">
                    <Image
                      src="/avatar.jpg"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="h-10 w-10 cursor-pointer rounded-full"
                    />
                    <div>{currentChat}</div>
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
                  {[1, 2, 3, 4, 5].map((_, idx) => (
                    <MessageCard
                      key={idx}
                      text="dummy message"
                      type={idx % 2 === 0 ? "SENT" : "RECEIVED"}
                    />
                  ))}
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
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleCreateNewMessage();
                      setMessageText("");
                    }
                  }}
                  className="w-[85%] rounded-md border-none bg-white py-2 pl-4 outline-none"
                />
                <BsMicFill />
              </div>
            </div>
          )}
          {/* LOGOUT BUTTON */}
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default Home;
