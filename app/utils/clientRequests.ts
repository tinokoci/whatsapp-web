import { SERVER_URL } from "./constants";
import {
  HttpRequest,
  AuthRequestData,
  MessageSendRequest,
  Message,
  User,
  DirectChat,
  UserUpdateRequest,
} from "@/utils/types";

const BASE_PRIVATE_URL = `${SERVER_URL}/api/v1`;

// USERS
export const getSelfUser = async (): Promise<User | null> => {
  const response = await createRequest({
    path: "/users/self",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const updateUser = async (
  request: UserUpdateRequest,
): Promise<User | null> => {
  const response = await createRequest({
    path: "/users",
    method: "PUT",
    body: JSON.stringify(request),
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const uploadFile = async (file: File): Promise<User | null> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await createff({
    path: "/users/upload",
    method: "POST",
    body: formData,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const searchUsersByUsername = async (
  query: string,
): Promise<User[] | null> => {
  const response = await createRequest({
    path: `/users/search/${query}`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// CHAT
export const getDirectChat = async (
  chatId: string,
): Promise<DirectChat | null> => {
  const response = await createRequest({
    path: `/chats/direct/${chatId}`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const getUserDirectChats = async (): Promise<DirectChat[] | null> => {
  const response = await createRequest({
    path: "/chats/direct/user",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const searchDirectChatsByUsername = async (
  username: string,
): Promise<DirectChat[] | null> => {
  const response = await createRequest({
    path: `/chats/direct/search/${username}`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// MESSAGES
export const sendMessage = async (
  request: MessageSendRequest,
): Promise<Message | null> => {
  const response = await createRequest({
    path: "/messages",
    method: "POST",
    body: JSON.stringify(request),
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const deleteMessage = async (
  messageId: string,
): Promise<Message | null> => {
  const response = await createRequest({
    path: `/messages/${messageId}`,
    method: "DELETE",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// AUTH
export const signUp = async (
  authRequestData: AuthRequestData,
): Promise<User | null> => {
  return auth("signup", authRequestData);
};

export const login = async (
  authRequestData: AuthRequestData,
): Promise<User | null> => {
  return auth("login", authRequestData);
};

export const logout = async (): Promise<boolean> => {
  const response = await createRequest({
    path: `/auth/logout`,
    method: "POST",
  });
  return response != null && response.ok;
};

const auth = async (
  path: string,
  authRequestData: AuthRequestData,
): Promise<User | null> => {
  const response = await createRequest({
    path: `/auth/${path}`,
    method: "POST",
    body: JSON.stringify(authRequestData),
  });
  if (response == null || !response.ok) return null;
  return await response.json();
};

export const createff = async ({
  path,
  method = "GET",
  headers = {},
  body,
}: HttpRequest): Promise<any> => {
  try {
    return await fetch(`${BASE_PRIVATE_URL}${path}`, {
      method,
      headers: {
        ...headers,
      },
      body,
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    return Promise.resolve(null);
  }
};

export const createRequest = async ({
  path,
  method = "GET",
  headers = {},
  body,
}: HttpRequest): Promise<any> => {
  try {
    return await fetch(`${BASE_PRIVATE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body,
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    return Promise.resolve(null);
  }
};
