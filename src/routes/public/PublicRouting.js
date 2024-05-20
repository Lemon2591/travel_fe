import SignIn from "../../pages/SignIn";
import SignUp from "../../pages/SignUp";

const PublicRouting = [
  {
    path: "/sign-in",
    Component: SignIn,
    exact: true,
  },

  {
    path: "/sign-up",
    Component: SignUp,
    exact: true,
  },
];

export default PublicRouting;
