import React, { useEffect } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";

const Loading = ({ children }) => {
  const isLoading = useSelector((state) => state?.loading?.isLoading);

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <Spin />
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
};

export default Loading;
