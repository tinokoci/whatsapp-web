"use client";

import { useAppSelector } from "@/redux/hooks";

const RawUsername = () => {
  const username = useAppSelector((store) => store.authReducer.username);
  return <div>{username}</div>;
};

export default RawUsername;
