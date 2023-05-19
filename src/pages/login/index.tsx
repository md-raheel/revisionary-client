import "./style.scss";
import { useEffect } from "react";
import { TUser } from "@/types/user";
import useLogin from "@/hooks/apis/useLogin";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isError, isLoading } = useLogin();

  const ACCESS_TOKEN = localStorage.getItem("auth");

  const onFinish = (values: TUser) => mutate(values);

  useEffect(() => {
    if (ACCESS_TOKEN) navigate("/syllabus-management");
  }, []);

  return (
    <Row justify="center" align="middle" className="login-container">
      <Row justify="center" style={{ width: "100%", padding: "0px 15px 0px 15px" }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={8} xxl={8}>
          <Card className="login-card">
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <h1>Revisionary</h1>
            </div>

            <Form onFinish={onFinish} initialValues={{ remember: true }}>
              <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                <Input.Password size="large" placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isError ? false : isLoading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Row>
  );
}

export default LoginPage;
