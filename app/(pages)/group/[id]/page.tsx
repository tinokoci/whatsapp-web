import { NextPage } from "next";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import UserMenu from "@/components/modules/UserMenu";
import ChatHeader from "@/components/modules/ChatHeader";
import ChatInteractive from "@/components/modules/ChatInteractive";
import { redirect } from "@/utils/helpers";
import { getGroup, getAllMessagesInChat } from "@/utils/serverRequests";

interface Props {
  params: {
    id: string;
  };
}

const Direct: NextPage<Props> = async ({ params }) => {
  const groupId = params.id;
  const group = await getGroup(groupId);

  if (!group) {
    redirect("/", "REPLACE", "Failed to find group");
    return;
  }
  const messages = await getAllMessagesInChat(group.chatId);

  if (!messages) {
    redirect("/", "REPLACE", "Failed to fetch group messages");
    return;
  }
  return (
    <ProtectedRoute>
      <Layout>
        <LeftPanel>
          <UserMenu />
        </LeftPanel>
        <RightPanel>
          <ChatHeader entity={group} />
          <ChatInteractive messages={messages.reverse()} chat={group} />
        </RightPanel>
      </Layout>
    </ProtectedRoute>
  );
};

export default Direct;
