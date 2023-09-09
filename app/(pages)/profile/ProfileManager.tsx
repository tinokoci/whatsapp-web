"use client";

import { ChangeEvent, ChangeEventHandler, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setUsername, setAvatar } from "@/redux/reducers/auth";
import { getImageLobSrc } from "@/utils/helpers";
import { updateUser, updateUserAvatar } from "@/utils/clientRequests";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { User } from "@/utils/types";

const ProfileManager = () => {
  const [isEditingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.authReducer.user);

  const toggleEditingName = () => {
    setEditingName((prev) => {
      if (prev) {
        handleNameChange();
      }
      return !prev;
    });
  };

  const handleNameChange = async () => {
    updateUser({ username: nameInput }).then((user) => {
      if (!user) return;
      dispatch(setUsername(user?.username));
      setNameInput("");
    });
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length == 0) return;

    updateUserAvatar(files[0]).then((user) => {
      if (user == null) return;
      dispatch(setAvatar(user.avatar));
    });
  };

  return (
    <>
      {/* Back Button*/}
      <Link
        href="/"
        className="flex cursor-pointer items-center gap-10 bg-[#008069] px-10 pb-5 pt-16 text-white"
      >
        <BsArrowLeft className="text-2xl font-bold" />
        <div className="font-semibold"> Profile</div>
      </Link>

      {/* Avatar */}
      <div className="my-12 flex flex-col items-center justify-center">
        <label htmlFor="avatar">
          <Image
            src={getImageLobSrc(user?.avatar, "/avatar.jpg")}
            alt="avatar"
            width={208}
            height={208}
            className="h-52 w-52 cursor-pointer rounded-full"
          ></Image>
        </label>
        <input
          accept="image/*"
          type="file"
          id="avatar"
          onChange={uploadAvatar}
          className="hidden"
        />
      </div>
      {/* Name Change */}
      <div className="bg-white px-3">
        <div className="py-3">Your Name</div>
        {isEditingName ? (
          <div className="flex w-full items-center justify-between py-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              className="w-4/5 border-b-2 border-blue-700 p-2 outline-none"
            />
            <BsCheck2
              onClick={toggleEditingName}
              className="cursor-pointer text-2xl"
            />
          </div>
        ) : (
          <div className="w-fill flex items-center justify-between">
            <div className="py-3">{user?.username}</div> {/* todo */}
            <BsPencil
              onClick={toggleEditingName}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileManager;
