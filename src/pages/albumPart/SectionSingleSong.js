import React from "react";
import { formatDate } from "../../utils/fnTime";

const SectionSingleSong = ({ dataPlaylist = {} }) => {
  return (
    <div className="w-full textPrimary">
      <h3 className="mb-2 text-base leading-5 font-bold capitalize">
        Thông tin
      </h3>
      <div className="w-full flex items-center gap-x-4">
        <div className="textSecondary2 text-[13px] font-medium flex flex-col gap-2 items-start">
          <p className="leading-[18px]">Số bài hát</p>
          <p className="leading-[18px]">Ngày phát hành</p>
          <p className="leading-[18px]">Cung cấp bởi</p>
        </div>
        <div className="text-[13px] font-medium flex flex-col gap-2 items-start">
          <p className="leading-[18px]">{dataPlaylist?.song?.total}</p>
          <p className="leading-[18px]">
            {dataPlaylist?.releaseDate ||
              formatDate(dataPlaylist?.contentLastUpdate, "/")}
          </p>
          <p className="leading-[18px]">{dataPlaylist?.distributor}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionSingleSong;
