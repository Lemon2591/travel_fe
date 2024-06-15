import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function PrivateRouter() {
  const cookies = new Cookies();
  const token = cookies.get("auth_t");

  return token ? <Outlet /> : <Navigate to={{ pathname: "/sign-in" }} />;
}

export default PrivateRouter;
