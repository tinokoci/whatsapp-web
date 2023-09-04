import Link from "next/link";
import UserNameAvatar from "@/components/UserNameAvatar";
import UserOptionsButton from "@/components/UserOptionsButton";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";

const UserTopBar = () => (
  <div className="flex items-center justify-between p-3">
    <UserNameAvatar />
    <div className="flex gap-3 text-2xl">
      <Link href="/status">
        <TbCircleDashed />
      </Link>
      <BiCommentDetail />
      <UserOptionsButton />
    </div>
  </div>
);

export default UserTopBar;
