import { redirect as nextRedirect } from "next/navigation";
import { RedirectType as NextRedirectType } from "next/dist/client/components/redirect";
import { AppDispatch } from "@/redux/store";
import {
  setUserChatPreviews,
  setUserGroupPreviews,
} from "@/redux/reducers/chat";
import { getUserDirectChats, getUserGroups } from "@/utils/clientRequests";
import { RedirectType } from "@/utils/types";

export const redirect = (
  path: string,
  type: RedirectType,
  message: string = "",
) => {
  if (message) {
    console.log(message);
  }
  const nextRedirectType =
    type === "PUSH" ? NextRedirectType.push : NextRedirectType.replace;
  try {
    nextRedirect(path, nextRedirectType);
  } catch (error) {
    console.log(error);
  }
};

export const postLogin = async (dispatch: AppDispatch) => {
  const userChatPreviewsData = await getUserDirectChats();
  dispatch(setUserChatPreviews(userChatPreviewsData || []));

  const userGroupPreviewsData = await getUserGroups();
  dispatch(setUserGroupPreviews(userGroupPreviewsData || []));
};

export const getImageLobSrc = (
  avatar: string | undefined,
  fallback: string = "",
): string => {
  return avatar ? `data:image/jpeg;base64,${avatar}` : fallback;
};

const TIME_AGO_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
});

export const formatTimeAgo = (timestamp: number): string => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  if (timeDifference < 1000) {
    return "Now";
  } else if (timeDifference < 60_000) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 3_600_000) {
    const minutes = Math.floor(timeDifference / 60_000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 86_400_000) {
    const hours = Math.floor(timeDifference / 3_600_000);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (timeDifference < 604_800_000) {
    const days = Math.floor(timeDifference / 86_400_000);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else {
    const date = new Date(timestamp);
    return TIME_AGO_DATE_FORMAT.format(date);
  }
};
