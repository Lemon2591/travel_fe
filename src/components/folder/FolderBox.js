import React from "react";
import { FolderOutlined, MoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";

const FolderBox = ({ value }) => {
  const navigate = useNavigate();

  return (
    <div
      className="folder_item flex justify-content-center"
      onClick={() => navigate(`/folders/${value?.file_id}`)}
    >
      <i>
        <FolderOutlined />
      </i>
      <p>{value.file_name}</p>
      <i>
        <MoreOutlined />
      </i>
    </div>
  );
};

const FileBox = ({ value }) => {
  return (
    <div
      className="folder_item flex justify-content-center"
      // onClick={() => navigate(`/folders/${value?.file_id}`)}
    >
      <Image width={150} src={value?.file_url} />
    </div>
  );
};

export { FolderBox, FileBox };
