import React, { useRef } from "react";
import MyTooltip from "../../components/MyTooltip";
import {
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeatOutline,
  IoShuffleOutline,
} from "react-icons/io5";
import useProgressCSS from "../../hooks/useProgressCSS";

const ControllPlayCenter = () => {
  const progressRef = useRef(null);
  useProgressCSS(progressRef);

  return (
    <div className="flex-1 flex flex-col justify-center items-center max-w-[40%] h-full">
      <div className="flex items-center mb-[3px]">
        <span className="w-8 h-8 p-[3px] mx-[7px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Bật phát ngẫu nhiên" offset={20}>
            <IoShuffleOutline className="w-6 h-6"></IoShuffleOutline>
          </MyTooltip>
        </span>
        <span className="w-8 h-8 p-[3px] mx-[7px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Phát trước đó" offset={20}>
            <IoPlaySkipBack className="w-5 h-5"></IoPlaySkipBack>
          </MyTooltip>
        </span>
        <div className="w-[50px] h-[50px] p-[5px] flex items-center justify-center">
          <span className="w-10 h-10 mx-[7px] flex-none flex items-center justify-center textPrimary2 border-[1px] hover:border-[var(--bg-primary)] rounded-full">
            <IoPlay className="w-5 h-5 translate-x-[1px]"></IoPlay>
          </span>
        </div>
        <span className="w-8 h-8 p-[3px] mx-[7px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Phát tiếp theo" offset={20}>
            <IoPlaySkipForward className="w-5 h-5"></IoPlaySkipForward>
          </MyTooltip>
        </span>
        <span className="w-8 h-8 p-[3px] mx-[7px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Bật phát lặp lại" offset={20}>
            <IoRepeatOutline className="w-6 h-6"></IoRepeatOutline>
          </MyTooltip>
        </span>
      </div>
      <div className="flex items-center w-full gap-[10px] mb-[5px]">
        <span className="w-12 text-xs font-medium text-right textPrimary">
          00:03
        </span>
        <div className="h-[15px] w-full flex-1 flex items-center">
          <input
            type="range"
            name="volume"
            min="0"
            max="100"
            className="customProgressBar"
            ref={progressRef}
          />
        </div>
        <span className="w-12 text-xs font-medium text-left textPrimary">
          04:43
        </span>
      </div>
    </div>
  );
};

export default ControllPlayCenter;
