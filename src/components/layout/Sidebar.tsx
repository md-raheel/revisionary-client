import { Layout, Menu } from "antd";
import { sidebarList } from "./constant";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Sider
      width={220}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ position: "fixed", left: 0, top: 65, bottom: 0 }}
    >
      <Menu mode="inline" style={{ paddingTop: 10, height: "100%" }}>
        {sidebarList.map(({ path, label, Icon }, index) => (
          <Menu.Item
            key={index}
            icon={<Icon />}
            className={path === pathname ? "ant-menu-item-active ant-menu-item-selected" : ""}
          >
            <Link to={path}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
