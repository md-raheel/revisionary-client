import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { sidebarList } from "./constant";

const { Sider } = Layout;

function Sidebar({ collapsed }: TSidebar) {
  return (
    <Sider
      width={250}
      collapsible
      trigger={null}
      collapsed={collapsed}
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{ paddingTop: 10, height: "calc(100vh - 72px)" }}
      >
        {sidebarList.map(({ path, label, Icon }, index) => (
          <Menu.Item key={index} icon={<Icon />}>
            <Link to={path}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

type TSidebar = { collapsed: boolean };

export default Sidebar;
