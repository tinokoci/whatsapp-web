import UserChats from "@/components/UserChats";
import UserSearch from "@/components/UserSearch";
import UserTopBar from "@/components/UserTopBar";

const UserMenu = async () => {
  return (
    <>
      <UserTopBar />
      <UserSearch placeholderText="Search or start new Chat" />
      <UserChats />
    </>
  );
};

export default UserMenu;
