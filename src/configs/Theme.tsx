import { ReactNode } from "react";
import { ConfigProvider } from "antd";

function AppTheme({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={{ token: { colorPrimary: "#00a148", borderRadius: 4 } }}>{children}</ConfigProvider>;
}

export default AppTheme;
