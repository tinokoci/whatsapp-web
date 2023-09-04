import { NextPage } from "next";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Layout from "@/components/layout/Layout";
import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import FallbackWindow from "@/components/modules/FallbackWindow";
import UserMenu from "@/components/modules/UserMenu";

const Home: NextPage = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <LeftPanel>
          <UserMenu />
        </LeftPanel>
        <RightPanel>
          <FallbackWindow />
        </RightPanel>
      </Layout>
    </ProtectedRoute>
  );
};

export default Home;
