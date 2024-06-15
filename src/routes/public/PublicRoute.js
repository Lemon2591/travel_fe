import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function PublicRouter() {
  const cookies = new Cookies();
  const token = cookies.get("auth_t");

  return !token ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
}

export default PublicRouter;
