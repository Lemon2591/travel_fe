import React from "react";
import { Spin } from "antd";

const LoadingScreen = () => {
  return (
    <div>
      <div className="loading">
        <Spin />
      </div>
    </div>
  );
};

export default LoadingScreen;
