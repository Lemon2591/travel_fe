import Home from "../../pages/Home";
import PostManagement from "../../pages/PostManagement";
import Api from "../../pages/Api";
import PostManager from "../../pages/PostManager";
import StoreMedia from "../../pages/StoreMedia";

const PrivateRouting = [
  {
    path: "/dashboard",
    Component: Home,
  },
  {
    path: "/post-manager",
    Component: PostManagement,
  },
  {
    path: "/post-manager/:id",
    Component: PostManager,
  },
  {
    path: "/api",
    Component: Api,
  },
  {
    path: "/create-post",
    Component: PostManager,
  },
  {
    path: "/store-media",
    Component: StoreMedia,
  },
];

export default PrivateRouting;
