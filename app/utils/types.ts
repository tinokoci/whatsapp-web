export type ProtectedRouteType = "PROTECTED" | "UNPROTECTED" | "AUTH_ROUTE";

export type HttpRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type MessageType = "SENT" | "RECEIVED";

export type CreateGroupState = "ADD_MEMBERS" | "EDIT_DISPLAY";

export interface HttpRequest {
  path: string;
  method?: HttpRequestMethod;
  headers?: { [key: string]: string };
  body?: any;
}

export interface AuthRequestData {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
}

export interface AuthResponseData {
  jwt: string;
  username: string;
  id: string;
}

export interface AuthState {
  id: string;
  jwt: string | null;
  username: string | null;
}

export interface ChatSearchState {
  activeEntityId: string;
  users: User[];
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
}

export interface ChatCreateDirectRequest {
  receiverId: string;
}

export interface ChatCreateGroupRequest {
  name: string;
  avatar: string;
  participants: string[];
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
}

export interface MessageSendRequest {
  entityId: string; // can be either Chat (for groups) or User (for DMs) id
  text: string;
}

export interface Message {
  senderId: string;
  text: string;
  timestamp: number;
  failedToSend?: boolean;
}
