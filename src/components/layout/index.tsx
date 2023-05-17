import "./style.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Grid, Layout } from "antd";
import { ReactNode } from "react";

const { Content } = Layout;
const { useBreakpoint } = Grid;

function AppLayout({ children }: { children: ReactNode }) {
  const screens = useBreakpoint();

  return (
    <Layout>
      <Header />
      <Layout style={{ marginTop: 65 }}>
        <Sidebar />
        <Layout>
          <Content
            className="content-container"
            style={{ marginLeft: screens.lg ? 220 : "" }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
