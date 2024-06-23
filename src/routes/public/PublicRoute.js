import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function PublicRouter() {
  const token = localStorage.getItem("auth_t");

  return !token ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
}

export default PublicRouter;
