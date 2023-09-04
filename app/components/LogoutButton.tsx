"use client";

import { useAppDispatch } from "@/redux/hooks";
import { logout as logoutAction } from "@/redux/reducers/auth";
import { logout } from "@/utils/clientRequests";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      dispatch(logoutAction());
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
