import Home from "../../pages/Home";
import Folder from "../../pages/Folder";
import Api from "../../pages/Api";
import PostManager from "../../pages/PostManager";
const PrivateRouting = [
  {
    path: "/dashboard",
    Component: Home,
  },
  {
    path: "/folders",
    Component: Folder,
  },
  {
    path: "/folders/:id",
    Component: Folder,
  },
  {
    path: "/api",
    Component: Api,
  },
  {
    path: "/post-manager",
    Component: PostManager,
  },
];

export default PrivateRouting;
