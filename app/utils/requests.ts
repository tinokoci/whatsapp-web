import { store } from "@/redux/store";
import {
  HttpRequest,
  AuthResponseData,
  AuthRequestData,
  Chat,
  ChatCreateDirectRequest,
  ChatCreateGroupRequest,
  MessageSendRequest,
  Message,
  User,
} from "./types";

const BASE_PRIVATE_URL = "http://localhost:8080/api/v1";

export const getOrCreateDirectChat = async (
  request: ChatCreateDirectRequest,
): Promise<Chat | null> => {
  const response = await createAuthorizedRequest({
    path: "/chats/normal",
    method: "POST",
    body: JSON.stringify(request),
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const createGroupChat = async (
  request: ChatCreateGroupRequest,
): Promise<Chat | null> => {
  const response = await createAuthorizedRequest({
    path: "/chats/group",
    method: "POST",
    body: JSON.stringify(request),
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const getAllChatsOfUser = async (): Promise<User[] | null> => {
  const response = await createAuthorizedRequest({
    path: "/chats/user",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const findAllChatsByUser = async (): Promise<Chat[] | null> => {
  const response = await createAuthorizedRequest({
    path: "/chats/group",
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const sendDirectMessage = async (
  request: MessageSendRequest,
): Promise<Message | null> => {
  const response = await createAuthorizedRequest({
    path: "/messages/personal",
    method: "POST",
    body: JSON.stringify(request),
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const getChatMessages = async (
  entityId: string,
): Promise<Message[] | null> => {
  const response = await createAuthorizedRequest({
    path: `/messages/chat/${entityId}`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const searchUsers = async (query: string): Promise<User[] | null> => {
  const response = await createAuthorizedRequest({
    path: `/users/search/${query}`,
  });
  if (!response || !response.ok) return null;
  return await response.json();
};

export const signUp = async (
  authRequestData: AuthRequestData,
): Promise<AuthResponseData | null> => {
  return auth("signup", authRequestData);
};

export const login = async (
  authRequestData: AuthRequestData,
): Promise<AuthResponseData | null> => {
  return auth("login", authRequestData);
};

const auth = async (
  path: string,
  authRequestData: AuthRequestData,
): Promise<AuthResponseData | null> => {
  const response = await createRawRequest({
    path: `/auth/${path}`,
    method: "POST",
    body: JSON.stringify(authRequestData),
  });
  if (response == null || !response.ok) return null;
  return await response.json();
};

const createAuthorizedRequest = async ({
  path,
  method = "GET",
  body,
}: HttpRequest): Promise<any> => {
  const jwt = store.getState().authReducer.jwt;
  if (!jwt) return Promise.resolve(null);
  return createRawRequest({
    path,
    method,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body,
  });
};

const createRawRequest = async ({
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
        "Content-Type": "application/json",
      },
      body,
    });
  } catch (error) {
    console.log(error);
    return Promise.resolve(null);
  }
};
