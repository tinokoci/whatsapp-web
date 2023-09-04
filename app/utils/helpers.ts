import { redirect as nextRedirect } from "next/navigation";
import { RedirectType as NextRedirectType } from "next/dist/client/components/redirect";
import { AppDispatch } from "@/redux/store";
import { setUserChatPreviews } from "@/redux/reducers/chat";
import { getUserDirectChats } from "@/utils/clientRequests";
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
  nextRedirect(path, nextRedirectType);
};

export const postLogin = async (dispatch: AppDispatch) => {
  const chatPreviewsData = await getUserDirectChats();
  dispatch(setUserChatPreviews(chatPreviewsData || []));
};
