import { cookies } from "next/headers";
import { SERVER_URL } from "./constants";
import { createRequest } from "@/utils/clientRequests";
import { DirectChat, Message, HttpRequest, User } from "@/utils/types";

const BASE_PRIVATE_URL = `${SERVER_URL}/api/v1`;

// CHAT

export const getOrCreateDirectChat = async (
  recipientId: string,
): Promise<DirectChat | null> => {
  const response = await createServerRequest({
    path: `/chats/direct/${recipientId}`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const getDirectChatMessages = async (
  chatId: string,
): Promise<Message[] | null> => {
  const response = await createServerRequest({
    path: `/chats/direct/${chatId}/messages`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

// USER
export const getUserById = async (userId: string): Promise<User | null> => {
  const response = await createServerRequest({
    path: `/users/${userId}`,
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
