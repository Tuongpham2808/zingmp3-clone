import React, { memo } from "react";
import { formatDuration } from "../utils/fnTime";
import ImageMedia from "./ImageMedia";

const CardVideo = ({ data = {} }) => {
  return (
    <div className="w-full textPrimary">
      <div className="w-full relative">
        <span className="absolute right-[5px] bottom-[5px] z-10 text-xs py-[3px] px-[5px] rounded bg-[rgba(0,0,0,0.7)]">
          {formatDuration(data?.duration)}
        </span>
        <ImageMedia image={data?.thumbnailM} tyle="large"></ImageMedia>
      </div>
      <div className="w-full py-[10px] flex items-center gap-x-[10px]">
        <img
          src={data?.artist?.thumbnail}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="w-full overflow-hidden">
          <span className="text-sm font-medium text1Line block">
            {data?.title}
          </span>
          <p className="text-xs textSecondary2 font-normal text1Line">
            {data?.artistsNames}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(CardVideo);
