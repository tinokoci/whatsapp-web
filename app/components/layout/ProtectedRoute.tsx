"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { acknowledgeFirstPageRender, auth } from "@/redux/reducers/auth";
import Loading from "@/components/modules/Loading";
import { ProtectedRouteType, User } from "@/utils/types";
import { getSelfUser } from "@/utils/clientRequests";
import { postLogin } from "@/utils/helpers";

interface Props {
  type?: ProtectedRouteType;
  user?: User | null;
  children: React.ReactNode;
}

const ProtectedRoute = ({ type = "PROTECTED", children }: Props) => {
  const dispatch = useAppDispatch();
  const { user, firstPageRender } = useAppSelector(
    (store) => store.authReducer,
  );
  const isLoggedIn = user != null;
  if (!firstPageRender) {
    if (!isLoggedIn && type === "PROTECTED") {
      redirect("/login");
    }
    if (isLoggedIn && type === "AUTH_ROUTE") {
      redirect("/");
    }
  }
  useEffect(() => {
    if (!firstPageRender) return;
    getSelfUser()
      .then(async (user) => {
        if (!user) return;
        dispatch(auth(user));
        await postLogin(dispatch);
      })
      .finally(() => dispatch(acknowledgeFirstPageRender()));
  }, []);
  if (firstPageRender) {
    return <Loading />;
  }
  return children;
};

export default ProtectedRoute;
