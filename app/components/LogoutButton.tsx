"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/reducers/auth";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((store) => store.authReducer.username);

  return <button onClick={() => dispatch(logout())}>Logout</button>;
};

export default LogoutButton;
