import { NextPage } from "next";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import FallbackWindow from "@/components/modules/FallbackWindow";
import ProfileManager from "./ProfileManager";

const Profile: NextPage = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <LeftPanel>
          <ProfileManager />
        </LeftPanel>
        <RightPanel>
          <FallbackWindow />
        </RightPanel>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
