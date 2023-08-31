"use client";

import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import FallbackWindow from "@/components/modules/FallbackWindow";
import SelectedMember from "@/components/SelectedMember";
import ChatCard from "@/components/ChatCard";
import type { CreateGroupState } from "@/utils/types";
import { BsArrowLeft, BsArrowRight, BsCheck2, BsPencil } from "react-icons/bs";
import { Button } from "@mui/material";

const CreateGroup: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [groupMembers, setGroupMembers] = useState<Set<string>>(new Set());
  const [currentState, setCurrentState] =
    useState<CreateGroupState>("ADD_MEMBERS");
  const [memberQuery, setMemberQuery] = useState<string>();

  const getTitle = () => {
    return currentState === "ADD_MEMBERS"
      ? "Add Group Participants"
      : "New Group";
  };

  const handleSearch = (query: string) => {};

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
            <div className="font-semibold"> {getTitle()}</div>
          </Link>

          {currentState === "ADD_MEMBERS" && (
            <>
              <div className="relative bg-white px-3 py-4">
                <div className="flex flex-wrap space-x-2 space-y-1">
                  {Array.from(groupMembers).map((member, idx) => (
                    <SelectedMember
                      key={idx}
                      handleRemoveMember={() => {
                        const newGroupMembers = new Set(groupMembers);
                        newGroupMembers.delete(member);
                        setGroupMembers(newGroupMembers);
                      }}
                      member={member}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  onChange={(event) => {
                    setMemberQuery(event.target.value);
                    handleSearch(event.target.value);
                  }}
                  value={memberQuery}
                  placeholder="Search user"
                  className="w-[93%] border-b border-[#888888] p-2 outline-none"
                />
              </div>
              <div className="h-[50vh] overflow-y-scroll bg-white">
                {memberQuery &&
                  ["ga", "asg", "34qh", "sdh", "34ha"].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        const newGroupMembers = new Set(groupMembers);
                        newGroupMembers.add(item);
                        setGroupMembers(newGroupMembers);
                        setMemberQuery("");
                      }}
                    >
                      <hr />
                      <ChatCard username="drotz" />
                    </div>
                  ))}
              </div>
              <div className="flex items-center justify-center bg-slate-200 py-10">
                <div className="cursor-pointer rounded-full bg-green-600 p-4 ">
                  <BsArrowRight
                    onClick={() => {
                      setCurrentState("EDIT_DISPLAY");
                    }}
                    className="text-3xl font-bold text-white"
                  />
                </div>
              </div>
            </>
          )}

          {currentState === "EDIT_DISPLAY" && (
            <>
              <div className="my-12 flex flex-col items-center justify-center">
                <label htmlFor="avatar">
                  <Image
                    src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                    alt="avatar"
                    width={208}
                    height={208}
                    className="h-52 w-52 cursor-pointer rounded-full"
                  ></Image>
                </label>
                <input type="file" id="avatar" className="hidden" />
              </div>
              <div className="px-3">
                <div className="flex w-full items-center justify-center py-2">
                  <input
                    type="text"
                    placeholder="Group Subject"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-4/5 border-b-2 border-green-600 bg-[#E8E9EC] p-2 outline-none"
                  />
                </div>
              </div>
              {name && (
                <div className="flex items-center justify-center bg-slate-200 py-10">
                  <Button>
                    <div className="rounded-full bg-[#0c977d] p-4">
                      <BsCheck2 className="text-3xl font-bold text-white" />
                    </div>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <FallbackWindow />
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateGroup;
