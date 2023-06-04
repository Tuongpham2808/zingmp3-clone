import React from "react";
import { RotatingLines } from "react-loader-spinner";

const LoadingIcon = () => {
  return (
    <RotatingLines
      strokeColor="#fff"
      strokeWidth="4"
      animationDuration="0.5"
      width="30"
      visible={true}
    />
  );
};

export default LoadingIcon;
