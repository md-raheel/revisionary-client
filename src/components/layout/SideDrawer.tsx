import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";
import { sidebarList } from "./constant";

function SideDrawer({ open, handleClose }: TDrawer) {
  return (
    <Drawer open={open} width={260} placement="left" onClose={handleClose}>
      <Menu
        mode="inline"
        onClick={handleClose}
        defaultSelectedKeys={["0"]}
        style={{ paddingTop: 10, height: "100%" }}
      >
        {sidebarList.map(({ path, label, Icon }, index) => (
          <Menu.Item key={index} icon={<Icon />}>
            <Link to={path}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Drawer>
  );
}

type TDrawer = { open: boolean; handleClose: VoidFunction };

export default SideDrawer;
