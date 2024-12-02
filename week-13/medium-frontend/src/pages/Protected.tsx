import { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";

function Protected() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth"); // Redirect to signin if not authenticated
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    // Show a loading spinner or placeholder while checking auth status
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Prevent rendering the protected route while redirecting
    return null;
  }

  return <Outlet />;
}

export default Protected;
