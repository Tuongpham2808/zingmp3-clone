import React, { useEffect, useRef } from "react";
import { GiMicrophone } from "react-icons/gi";
import { VscChromeRestore } from "react-icons/vsc";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { MdOutlineQueueMusic } from "react-icons/md";
import { MyTooltip } from "../../components";
import useToggle from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSBR } from "../../store/responsiveSlice";
import useProgressCSS from "../../hooks/useProgressCSS";

const ControllRight = () => {
  const progressRef = useRef(null);
  useProgressCSS(progressRef);
  const { isOpenSBR, screen } = useSelector((state) => state.screen);
  const { toggle, handleToggle } = useToggle(isOpenSBR);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToggleSBR(toggle));
    let rootStyle = document.documentElement.style;
    if (toggle && screen === "2xl") {
      rootStyle.setProperty("--margin-contentRight", "330px");
    }
    if (!toggle) {
      rootStyle.setProperty("--margin-contentRight", "0px");
    }
  }, [dispatch, screen, toggle]);

  return (
    <div className="flex items-center z-[3]">
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
        <span
          className="w-[30px] h-7 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded bgPrimary cursor-pointer"
          onClick={handleToggle}
        >
          <MyTooltip placeholder="Danh sách phát" offset={20}>
            <MdOutlineQueueMusic></MdOutlineQueueMusic>
          </MyTooltip>
        </span>
      </div>
    </div>
  );
};

export default ControllRight;
