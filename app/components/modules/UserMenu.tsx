import UserChats from "@/components/UserChats";
import UserSearch from "@/components/UserSearch";
import UserTopBar from "@/components/UserTopBar";

const UserMenu = async () => {
  return (
    <>
      <UserTopBar />
      <UserSearch />
      <UserChats />
    </>
  );
};

export default UserMenu;
