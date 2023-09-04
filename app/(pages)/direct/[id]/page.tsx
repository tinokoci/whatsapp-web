import { NextPage } from "next";

import {
  getOrCreateDirectChat,
  getDirectChatMessages,
  getUserById,
} from "@/utils/serverRequests";
import { redirect } from "@/utils/helpers";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import UserMenu from "@/components/modules/UserMenu";
import DirectChatHeader from "./DirectChatHeader";
import DirectChatInteractive from "./DirectChatInteractive";
import { User } from "@/utils/types";

interface Props {
  params: {
    id: string;
  };
}

const Direct: NextPage<Props> = async ({ params }) => {
  const recipientId = params.id;
  const chat = await getOrCreateDirectChat(recipientId);

  if (!chat) {
    redirect("/", "REPLACE", "Failed to find or create chat");
    return;
  }
  const recipient = await getUserById(recipientId);

  if (!recipient) {
    redirect("/", "REPLACE", "Failed to fetch recipient");
  }
  const messages = await getDirectChatMessages(chat.chatId);

  if (!messages) {
    redirect("/", "REPLACE", "Failed to fetch chat messages");
    return;
  }
  return (
    <ProtectedRoute>
      <Layout>
        <LeftPanel>
          <UserMenu />
        </LeftPanel>
        <RightPanel>
          <DirectChatHeader recipient={recipient as User} />
          <DirectChatInteractive
            messages={messages.reverse()}
            recipient={recipient as User}
            chat={chat}
          />
        </RightPanel>
      </Layout>
    </ProtectedRoute>
  );
};

export default Direct;
