import React from "react";
import { Play } from "../../utils/iconsOther";

const SidebarNewList = () => {
  return (
    <div className="px-8 font-medium text-center textPrimary">
      <h3 className="text-sm mt-[6px] mb-5">
        Khám phá thêm các bài hát mới của Zing MP3
      </h3>
      <button className="text-sm py-[7px] px-[26px] flex items-center justify-center bgPrimary transAll mx-auto rounded-full gap-[10px]">
        <span>
          <Play></Play>
        </span>
        <p>Phát nhạc mới phát hành</p>
      </button>
    </div>
  );
};

export default SidebarNewList;
