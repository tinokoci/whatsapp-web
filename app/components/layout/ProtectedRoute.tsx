"use client";

import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { ProtectedRouteType } from "@/utils/types";

interface Props {
  type: ProtectedRouteType;
  children: React.ReactNode;
}

const ProtectedRoute = ({ type, children }: Props) => {
  const isAuthenticated =
    useAppSelector((store) => store.authReducer.jwt) != null;

  if (!isAuthenticated && type === "PROTECTED") {
    redirect("/login");
  }
  if (isAuthenticated && type === "AUTH_ROUTE") {
    redirect("/");
  }
  return children;
};

export default ProtectedRoute;
