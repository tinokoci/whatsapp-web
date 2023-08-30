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
}

export interface AuthState {
  jwt: string | null;
  username: string | null;
}
