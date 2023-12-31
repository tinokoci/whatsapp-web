import { NextPage } from "next";

import {
  getOrCreateDirectChat,
  getAllMessagesInChat,
  getUserById,
} from "@/utils/serverRequests";
import { redirect } from "@/utils/helpers";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import UserMenu from "@/components/modules/UserMenu";
import ChatHeader from "@/components/modules/ChatHeader";
import ChatInteractive from "@/components/modules/ChatInteractive";

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
    return;
  }
  const messages = await getAllMessagesInChat(chat.chatId);

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
          <ChatHeader entity={recipient} />
          <ChatInteractive messages={messages.reverse()} chat={chat} />
        </RightPanel>
      </Layout>
    </ProtectedRoute>
  );
};

export default Direct;
