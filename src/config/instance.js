import {
  AiOutlineBarChart,
  AiOutlineFile,
  AiOutlineGroup,
} from "react-icons/ai";

export const authHeader = (role) => {
  const arrHeader = [
    {
      role: "system_admin",
      header: [
        // {
        //   title: "Thống kê",
        //   icon: <AiOutlineBarChart />,
        //   path: "/dashboard",
        // },
        {
          title: "Quản lý bài viết",
          icon: <AiOutlineGroup />,
          path: "/post-manager",
        },
        {
          title: "Tạo bài viết",
          icon: <AiOutlineFile />,
          path: "/create-post",
        },
      ],
    },
  ];

  return arrHeader?.find((it) => it?.role === role);
};
