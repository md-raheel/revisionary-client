import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { sidebarList } from "./constant";

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider
      width={220}
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ position: "fixed", left: 0, top: 65, bottom: 0 }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        style={{ paddingTop: 10, height: "100%" }}
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

export default Sidebar;
