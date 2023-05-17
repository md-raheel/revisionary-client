import "./style.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Grid, Layout } from "antd";
import { ReactNode, useEffect, useState } from "react";

const { Content } = Layout;
const { useBreakpoint } = Grid;

function AppLayout({ children }: { children: ReactNode }) {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (screens.lg) setCollapsed(false);
    else setCollapsed(true);
  }, [screens]);

  return (
    <Layout>
      <Header toggleSidebar={toggleSidebar} />
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
