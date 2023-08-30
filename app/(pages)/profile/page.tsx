"use client";

import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import WelcomeCard from "@/components/WelcomeCard";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";

const Profile: NextPage = () => {
  const usernameFromRedux = useAppSelector(
    (store) => store.authReducer.username,
  ); /* todo */

  const [name, setName] = useState<string>("");
  const [editingName, setEditingName] = useState<boolean>();

  const toggleEditingName = () => {
    setEditingName((prev) => !prev);
  };

  return (
    <ProtectedRoute type="PROTECTED">
      <Layout>
        <div className="h-full w-[30%] bg-[#E8E9EC]">
          {/* Back */}
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
                src="/avatar.jpg"
                alt="avatar"
                width={208}
                height={208}
                className="h-52 w-52 cursor-pointer rounded-full"
              ></Image>
            </label>
            <input type="file" id="avatar" className="hidden" />
          </div>
          {/* Name Change */}
          <div className="bg-white px-3">
            <div className="py-3">Your Name</div>
            {editingName ? (
              <div className="flex w-full items-center justify-between py-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-4/5 border-b-2 border-blue-700 p-2 outline-none"
                />
                <BsCheck2
                  onClick={toggleEditingName}
                  className="cursor-pointer text-2xl"
                />
              </div>
            ) : (
              <div className="w-fill flex items-center justify-between">
                <div className="py-3">{name || usernameFromRedux}</div>{" "}
                {/* todo */}
                <BsPencil
                  onClick={toggleEditingName}
                  className="cursor-pointer text-2xl"
                />
              </div>
            )}
          </div>
        </div>
        <WelcomeCard />
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
