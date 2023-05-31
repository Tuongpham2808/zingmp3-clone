import React from "react";
import { IoPlay } from "react-icons/io5";
import MyTooltip from "./MyTooltip";
import { FiMoreHorizontal } from "react-icons/fi";
import { formatTime } from "../utils/fnTime";

const CardMedia = ({
  image = "https://source.unsplash.com/random/?man",
  artists = "Sơn Tùng",
  time = "2 giờ trước",
}) => {
  const timeFormat = formatTime(time);
  return (
    <div className="group rounded hover:bg-[var(--bg-transparent1)] flex items-center w-full p-[10px] gap-x-[10px] select-none">
      <div className="flex gap-x-[10px] w-full items-start overflow-hidden">
        <div className="relative flex-none">
          <img
            src={image}
            alt=""
            className="w-[60px] h-[60px] object-cover rounded"
          />
          <span className="hidden group-hover:flex absolute w-[60px] h-[60px] top-0 left-0 bg-black bg-opacity-40 items-center justify-center cursor-pointer">
            <IoPlay className="w-6 h-6"></IoPlay>
          </span>
        </div>
        <div className="w-full overflow-hidden">
          <h3 className="text-sm font-medium text1Line">Chàng trai năm đó</h3>
          <p className="text-xs font-medium mt-[3px] textSecondary cursor-pointer">
            {artists}
          </p>
          <p className="text-xs font-medium mt-[3px] textSecondary2">
            {timeFormat}
          </p>
        </div>
      </div>
      <div className="w-[46px] h-[46px] hidden items-center justify-center group-hover:flex">
        <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)] cursor-pointer">
          <MyTooltip placeholder="Khác" offset={20}>
            <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
          </MyTooltip>
        </span>
      </div>
    </div>
  );
};

export default CardMedia;
