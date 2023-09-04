export type ProtectedRouteType = "PROTECTED" | "UNPROTECTED" | "AUTH_ROUTE";

export type HttpRequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type MessageType = "SENT" | "RECEIVED";

export type CreateGroupState = "ADD_MEMBERS" | "EDIT_DISPLAY";

export type ChatType = "DIRECT" | "GROUP";

export type RedirectType = "PUSH" | "REPLACE";

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

export interface AuthState {
  user: User | null;
  firstPageRender: boolean;
}

export interface ChatSearchState {
  openedChatId: string;
  openedChatUserId?: string | null;
  userChatPreviews: DirectChat[];
  searchChatPreviews: DirectChat[];
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

// Request Response DTOs (data transfer objects)

export interface Chat {
  chatId: string;
  name: string;
  avatar: string;
  latestMessageText: string;
}

export interface GroupChat extends Chat {}

export interface DirectChat extends GroupChat {
  recipientId: string;
}

export interface Message {
  senderId: string;
  text: string;
  timestamp: number;
  failedToSend?: boolean;
}

export interface MessageSendRequest {
  chatId: string;
  text: string;
}

export interface UserUpdateRequest {
  username?: string;
  fullName?: string;
  avatar?: string;
}
