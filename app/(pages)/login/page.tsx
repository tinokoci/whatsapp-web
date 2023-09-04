"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useAppDispatch } from "@/redux/hooks";
import { auth } from "@/redux/reducers/auth";
import { login } from "@/utils/clientRequests";
import { AuthRequestData } from "@/utils/types";
import { postLogin } from "@/utils/helpers";

const Login: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<AuthRequestData>({
    username: "",
    password: "",
    fullName: "",
    email: "",
  });

  const updateFormDataField = <T,>(newData: Record<string, T>) => {
    setFormData((previous) => ({
      ...previous,
      ...newData,
    }));
  };

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>,
    formData: AuthRequestData,
  ) => {
    event.preventDefault();
    const user = await login(formData);
    if (user == null) return;
    dispatch(auth(user));
    await postLogin(dispatch);
  };
  return (
    <ProtectedRoute type="AUTH_ROUTE">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-1/3 bg-white p-10 shadow-md">
          <form
            onSubmit={(event) => handleLogin(event, formData)}
            className="flex flex-col gap-3"
          >
            {/* Username Input */}
            <div>
              <div className="mb-2">Username:</div>
              <input
                type="text"
                placeholder={"Enter your username"}
                value={formData.username}
                onChange={(event) =>
                  updateFormDataField({ username: event.target.value })
                }
                className="w-full rounded-md border py-2 pl-2 outline outline-green-600"
              />
            </div>
            {/* Password Input */}
            <div>
              <div className="mb-2">Password:</div>
              <input
                type="password"
                autoComplete="on"
                placeholder={"Enter your password"}
                value={formData.password}
                onChange={(event) =>
                  updateFormDataField({ password: event.target.value })
                }
                className="w-full rounded-md border py-2 pl-2 outline outline-green-600"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-green-600 py-2 text-sm text-white"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-5 flex items-center space-x-3">
            <div>Create New Account</div>
            <button
              onClick={() => router.push("signup")}
              className="text-blue-500"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Login;
