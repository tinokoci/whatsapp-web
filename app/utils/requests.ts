import { HttpRequest, AuthResponseData, AuthRequestData } from "./types";

const BASE_PRIVATE_URL = "http://localhost:8080/api/v1";

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
    path: `auth/${path}`,
    method: "POST",
    body: JSON.stringify(authRequestData),
  });
  if (response == null || !response.ok) return null;
  return await response.json();
};

const createAuthorizedRequest = async ({
  path,
  method = "GET",
}: HttpRequest): Promise<any> => {
  const jwt = "dummy";
  return createRawRequest({
    path,
    method,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

const createRawRequest = async ({
  path,
  method = "GET",
  headers = {},
  body,
}: HttpRequest): Promise<any> => {
  try {
    return await fetch(`${BASE_PRIVATE_URL}/${path}`, {
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
