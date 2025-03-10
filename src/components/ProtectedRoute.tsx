// ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import { ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />
  }

  console.log("viendo user desde protected route", user);

  if (!user) {
    return <Navigate to="/LogIn" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;