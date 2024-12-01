import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
function Protected() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);
  return <Outlet />;
}

export default Protected;
