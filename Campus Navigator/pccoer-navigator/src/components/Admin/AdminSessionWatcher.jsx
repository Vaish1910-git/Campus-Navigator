import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdminSessionWatcher = () => {
  const location = useLocation();

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith("/admin");

    if (!isAdminRoute) {
      sessionStorage.removeItem("isAdminAuthenticated");
    }
  }, [location.pathname]);

  return null; // This component does not render anything
};

export default AdminSessionWatcher;
