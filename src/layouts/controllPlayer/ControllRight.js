import React, { useRef } from "react";
import { GiMicrophone } from "react-icons/gi";
import MyTooltip from "../../components/MyTooltip";
import { VscChromeRestore } from "react-icons/vsc";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { MdOutlineQueueMusic } from "react-icons/md";
import useProgressCSS from "../../hooks/useProgressCSS";

const ControllRight = () => {
  const progressRef = useRef(null);
  useProgressCSS(progressRef);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Xem lời bài hát" offset={20}>
            <GiMicrophone></GiMicrophone>
          </MyTooltip>
        </span>
        <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Chế độ cửa sổ" offset={20}>
            <VscChromeRestore className="w-5 h-5"></VscChromeRestore>
          </MyTooltip>
        </span>
        <div className="flex items-center flex-1">
          <span className="w-8 h-8 p-[3px] mx-[2px] flex-none flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
            <HiOutlineVolumeUp className="w-5 h-5"></HiOutlineVolumeUp>
          </span>
          <div className="h-[15px] w-[70px] flex-1 flex items-center">
            <input
              type="range"
              name="volume"
              min="0"
              max="100"
              className="customProgressBar"
              ref={progressRef}
            />
          </div>
        </div>
        <span className="h-8 px-5"></span>
        <span className="w-[30px] h-7 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded bgPrimary">
          <MyTooltip placeholder="Danh sách phát" offset={20}>
            <MdOutlineQueueMusic></MdOutlineQueueMusic>
          </MyTooltip>
        </span>
      </div>
    </div>
  );
};

export default ControllRight;
