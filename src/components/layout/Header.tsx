import AntButton from "../button";
import { Col, Grid, Layout, Row } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { useBreakpoint } = Grid;

function HeaderComponent({ toggleSidebar }: THeader) {
  const screens = useBreakpoint();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = window.location.origin + "/";
  };

  return (
    <Header className="app-header">
      <Row justify="space-between">
        <Col>
          <Row align="middle">
            {!screens.lg ? (
              <AntButton
                type="text"
                onClick={toggleSidebar}
                icon={<MenuFoldOutlined />}
                style={{ marginRight: 10, marginLeft: -30 }}
              />
            ) : null}
            <h1>Logo</h1>
          </Row>
        </Col>
        <Col>
          <AntButton size="large" label="Logout" onClick={handleLogout} />
        </Col>
      </Row>
    </Header>
  );
}

type THeader = { toggleSidebar: VoidFunction };

export default HeaderComponent;
