import { AppLayout } from "@/components";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const ACCESS_TOKEN = localStorage.getItem("auth");

  return ACCESS_TOKEN ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
