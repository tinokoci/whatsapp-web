"use client";

import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { useAppDispatch } from "@/redux/hooks";
import { auth } from "@/redux/reducers/auth";
import { signUp } from "@/utils/requests";
import { AuthRequestData } from "@/utils/types";
import type { FormEvent } from "react";

const SignUp: NextPage = () => {
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

  const handleSignUp = async (
    event: FormEvent<HTMLFormElement>,
    formData: AuthRequestData,
  ) => {
    event.preventDefault();
    const data = await signUp(formData);
    if (data == null) return;

    dispatch(auth(data));
  };

  return (
    <ProtectedRoute type="AUTH_ROUTE">
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-1/3 bg-white p-10 shadow-md">
          <form
            onSubmit={(event) => handleSignUp(event, formData)}
            className="flex flex-col gap-3"
          >
            {/* Email Input */}
            <div>
              <div className="mb-2">Email:</div>
              <input
                type="email"
                placeholder={"Enter your email"}
                value={formData.email}
                onChange={(event) =>
                  updateFormDataField({ email: event.target.value })
                }
                className="w-full rounded-md border py-2 outline outline-green-600"
              />
            </div>
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
                className="w-full rounded-md border py-2 outline outline-green-600"
              />
            </div>
            {/* Full Name Input */}
            <div>
              <div className="mb-2">Full Name:</div>
              <input
                type="text"
                placeholder={"Enter your full name"}
                value={formData.fullName}
                onChange={(event) =>
                  updateFormDataField({ fullName: event.target.value })
                }
                className="w-full rounded-md border py-2 outline outline-green-600"
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
                className="w-full rounded-md border py-2 outline outline-green-600"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-green-600 py-2 text-sm text-white"
            >
              SIGN UP
            </button>
          </form>
          <div className="mt-5 flex items-center space-x-3">
            <div>Already An User</div>
            <button
              onClick={() => router.push("login")}
              className="text-blue-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SignUp;
