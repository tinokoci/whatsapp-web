"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import FallbackWindow from "@/components/modules/FallbackWindow";
import BackHeader from "@/components/BackHeader";
import { createGroup } from "@/utils/clientRequests";
import { DirectChat, GroupCreateState, User } from "@/utils/types";
import { BsArrowRight, BsCheck2 } from "react-icons/bs";
import { Button } from "@mui/material";
import DirectChatCard from "@/components/DirectChatCard";
import SelectedMember from "@/components/SelectedMember";
import UserSearch from "@/components/UserSearch";
import { setUserGroupPreviews } from "@/redux/reducers/chat";

const CreateGroup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((store) => store.authReducer.user) as User;
  const groupPreviews = useAppSelector(
    (store) => store.chatReducer.userGroupPreviews,
  );
  const [currentState, setCurrentState] =
    useState<GroupCreateState>("ADD_MEMBERS");
  const [name, setName] = useState<string>("");
  const [participants, setParticipants] = useState<DirectChat[]>([]);
  const [avatar, setAvatar] = useState<File>();

  const searchChatPreviews = useAppSelector(
    (store) => store.chatReducer.searchChatPreviews,
  );

  const changeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length == 0) return;
    setAvatar(files[0]);
  };

  const handleCreateGroup = async () => {
    if (!participants || participants.length == 0) return;
    const group = await createGroup({
      name,
      participants: [user.id, ...participants.map((p) => p.recipientId)],
    });
    if (!group) return;
    dispatch(setUserGroupPreviews([group, ...groupPreviews]));
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <Layout>
        <LeftPanel>
          <BackHeader
            title={
              currentState === "ADD_MEMBERS"
                ? "Add Group Participants"
                : "New Group"
            }
          />
          {/* ADD MEMBERS STATE */}
          {currentState === "ADD_MEMBERS" && (
            <>
              <div className="bg-white px-3 py-4">
                <div className="flex flex-wrap space-x-2 space-y-1">
                  {Array.from(participants).map((member, idx) => (
                    <SelectedMember
                      key={idx}
                      handleRemoveMember={() => {
                        setParticipants(
                          participants.filter((gm) => gm.name != member.name),
                        );
                      }}
                      member={member}
                    />
                  ))}
                </div>
                <UserSearch placeholderText="Search an user" />
                <div className="grow overflow-y-scroll bg-white px-3">
                  {searchChatPreviews
                    .filter(
                      (chatPreview) =>
                        !participants.some((gm) => gm.name == chatPreview.name),
                    )
                    .map((chatPreview, idx) => (
                      <DirectChatCard
                        key={idx}
                        chatPreview={chatPreview}
                        onClick={() => {
                          setParticipants([chatPreview, ...participants]);
                        }}
                      />
                    ))}
                </div>
              </div>
              <div className="flex items-center justify-center bg-slate-200 py-10">
                <div className="cursor-pointer rounded-full bg-green-600 p-4 ">
                  <BsArrowRight
                    onClick={() => {
                      setCurrentState("EDIT_INFO");
                    }}
                    className="text-3xl font-bold text-white"
                  />
                </div>
              </div>
            </>
          )}
          {/* EDIT INFO STATE */}
          {currentState === "EDIT_INFO" && (
            <>
              <div className="my-12 flex flex-col items-center justify-center">
                <label htmlFor="avatar">
                  <Image
                    src={avatar ? URL.createObjectURL(avatar) : "/group.png"}
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
                  onChange={changeAvatar}
                  className="hidden"
                />
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
                    <div
                      onClick={handleCreateGroup}
                      className="rounded-full bg-[#0c977d] p-4"
                    >
                      <BsCheck2 className="text-3xl font-bold text-white" />
                    </div>
                  </Button>
                </div>
              )}
            </>
          )}
        </LeftPanel>
        <RightPanel>
          <FallbackWindow />
        </RightPanel>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateGroup;
