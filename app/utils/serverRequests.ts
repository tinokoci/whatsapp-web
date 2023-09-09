import { cookies } from "next/headers";
import { createRequest } from "@/utils/clientRequests";
import {
  DirectChat,
  Message,
  HttpRequest,
  User,
  GroupChat,
  GroupCreateRequest,
} from "@/utils/types";

// CHAT
export const getOrCreateDirectChat = async (
  recipientId: string,
): Promise<DirectChat | null> => {
  const response = await createServerRequest({
    path: `/chats/direct/${recipientId}`,
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const getGroup = async (chatId: string): Promise<GroupChat | null> => {
  const response = await createServerRequest({
    path: `/chats/groups/${chatId}`,
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const deleteGroup = async (
  groupId: string,
): Promise<GroupChat | null> => {
  const response = await createServerRequest({
    path: `/chats/groups/${groupId}`,
    method: "DELETE",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const addUserToGroup = async (
  groupId: string,
  userToAddId: string,
): Promise<GroupChat | null> => {
  const response = await createServerRequest({
    path: `/chats/group/${groupId}/add/${userToAddId}`,
    method: "POST",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const removeUserFromGroup = async (
  groupId: string,
  userToRemoveId: string,
): Promise<GroupChat | null> => {
  const response = await createServerRequest({
    path: `/chats/group/${groupId}/remove/${userToRemoveId}`,
    method: "POST",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// MESSAGES
export const getAllMessagesInChat = async (
  chatId: string,
): Promise<Message[] | null> => {
  const response = await createServerRequest({
    path: `/messages/${chatId}`,
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// USER
export const getUserById = async (userId: string): Promise<User | null> => {
  const response = await createServerRequest({
    path: `/users/${userId}`,
    method: "GET",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

const createServerRequest = async ({
  path,
  method = "GET",
  headers = {},
  body,
}: HttpRequest): Promise<any> => {
  const token = getJWTCookie();
  if (token) {
    headers = {
      ...headers,
      Cookie: token,
    };
  }
  return createRequest({
    path,
    method,
    body,
    headers,
  });
};

const getJWTCookie = (): string | null => {
  const kukis = cookies();
  const token = kukis.get("token");
  return token ? `${token.name}=${token.value}` : null;
};
