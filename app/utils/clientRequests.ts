import { SERVER_URL } from "./constants";
import {
  HttpRequest,
  AuthRequestData,
  MessageSendRequest,
  Message,
  User,
  DirectChat,
  UserUpdateRequest,
  GroupCreateRequest,
  GroupChat,
} from "@/utils/types";

const BASE_PRIVATE_URL = `${SERVER_URL}/api/v1`;

// USERS
export const getSelfUser = async (): Promise<User | null> => {
  const response = await createRequest({
    path: "/users/self",
    method: "GET",
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

export const updateUserAvatar = async (file: File): Promise<User | null> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await createRequest({
    path: "/users/upload",
    method: "PATCH",
    body: formData,
    contentType: "",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const searchUsersByUsername = async (
  query: string,
): Promise<User[] | null> => {
  const response = await createRequest({
    path: `/users/search/${query}`,
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// CHAT
export const getUserDirectChats = async (): Promise<DirectChat[] | null> => {
  const response = await createRequest({
    path: "/chats/direct",
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const getUserGroups = async (): Promise<GroupChat[] | null> => {
  const response = await createRequest({
    path: "/chats/groups",
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const searchDirectChatsByUsername = async (
  username: string,
): Promise<DirectChat[] | null> => {
  const response = await createRequest({
    path: `/chats/direct/search/${username}`,
    method: "GET",
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

// GROUP
export const createGroup = async (
  request: GroupCreateRequest,
): Promise<GroupChat | null> => {
  const response = await createRequest({
    path: "/chats/groups",
    method: "POST",
    body: JSON.stringify(request),
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

export const createRequest = async ({
  path,
  method,
  headers = {},
  contentType = "application/json",
  body,
}: HttpRequest): Promise<any> => {
  try {
    if (contentType) {
      headers = { "Content-Type": contentType, ...headers };
    }
    return await fetch(`${BASE_PRIVATE_URL}${path}`, {
      method,
      headers,
      body,
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    return Promise.resolve(null);
  }
};
