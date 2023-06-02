import React from "react";
import ImageMedia from "./ImageMedia";

const CardReleaseMedia = ({ data = {} }) => {
  return (
    <div className="px-[14px]">
      <div className="p-[15px] bgTrans1 rounded">
        <ImageMedia
          image={data.thumbnailM}
          classImage="w-[120px] h-[120px]"
          tyle="large"
        ></ImageMedia>
      </div>
    </div>
  );
};

export default CardReleaseMedia;
