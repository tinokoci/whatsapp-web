import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ChatCardsWindow from "./components/modules/ChatCardsWindow";
import FallbackWindow from "@/components/modules/FallbackWindow";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import RightPanel from "./components/modules/RightPanel";
import DirectChatWindow from "@/components/modules/DirectChatWindow";
import ChatSearch from "./components/ChatSearch";
import RawUsername from "./components/RawUsername";
import UserMenu from "./components/UserMenu";

const Home: NextPage = () => {
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
                <RawUsername />
              </div>
              {/* Buttons */}
              <div className="flex space-x-3 text-2xl">
                <Link href="/status">
                  <TbCircleDashed />
                </Link>
                <BiCommentDetail />
                <UserMenu />
              </div>
            </div>
            <ChatSearch />
            <ChatCardsWindow />
          </div>
          <RightPanel
            chatWindow={<DirectChatWindow />}
            welcomeCard={<FallbackWindow />}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default Home;
