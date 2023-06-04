import React from "react";

import { Audio } from "react-loader-spinner";

const PlayingIcon = () => {
  return (
    <Audio
      height="25"
      width="25"
      color="#fff"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass="wrapper-class"
      visible={true}
    />
  );
};

export default PlayingIcon;
