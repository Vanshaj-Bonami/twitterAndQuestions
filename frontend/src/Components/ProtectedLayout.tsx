import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context";

const ProtectedLayout = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
