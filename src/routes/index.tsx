import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/login"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const ClassManagementPage = lazy(() => import("@/pages/classManagement"));
const SyllabusManagementPage = lazy(() => import("@/pages/syllabusManagement"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="syllabus-management" element={<SyllabusManagementPage />} />
        <Route path="class-management" element={<ClassManagementPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
