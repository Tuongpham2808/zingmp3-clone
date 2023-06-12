import React, { useEffect, useRef } from "react";
import { MyTooltip } from "../../components";
import useToggle from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSBR } from "../../store/responsiveSlice";
import useProgressCSS from "../../hooks/useProgressCSS";
import { setVolumeAudio } from "../../store/musicSlice";
import {
  GiMicrophone,
  HiOutlineVolumeOff,
  HiOutlineVolumeUp,
  MdOutlineQueueMusic,
  VscChromeRestore,
} from "../../utils/iconsOther";
import useWindowSize from "../../hooks/useWindowSize";

const ControllRight = () => {
  const progressRef = useRef(null);
  useProgressCSS(progressRef);
  let size = useWindowSize();

  const { isOpenSBR } = useSelector((state) => state.screen);
  const { volumeAudio } = useSelector((state) => state.music);
  const { toggle, handleToggle } = useToggle(isOpenSBR);
  const dispatch = useDispatch();
  // console.log(volumeAudio);
  useEffect(() => {
    dispatch(setToggleSBR(toggle));
    let rootStyle = document.documentElement.style;
    if (toggle && size === "2xl") {
      rootStyle.setProperty("--margin-contentRight", "330px");
    } else {
      rootStyle.setProperty("--margin-contentRight", "0px");
    }
  }, [dispatch, size, toggle]);
  useEffect(() => {
    function updateVolume(event) {
      dispatch(setVolumeAudio(event.target.value));
    }
    progressRef.current?.addEventListener("change", updateVolume);
    return function cleanup() {
      progressRef.current?.addEventListener("change", updateVolume);
    };
  }, [dispatch]);
  const handleVolumeBtn = (event) => {
    if (volumeAudio > 0) {
      dispatch(setVolumeAudio(0));
      progressRef.current.style.background =
        "linear-gradient(to right, var(--text-primary) 0%, var(--text-secondary) 0%)";
      progressRef.current.value = 0;
    } else {
      dispatch(setVolumeAudio(50));
      progressRef.current.style.background =
        "linear-gradient(to right, var(--text-primary) 50%, var(--text-secondary) 50%)";
      progressRef.current.value = 50;
    }
  };

  return (
    <div className="flex items-center z-30">
      <div className="flex items-center">
        <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)] cursor-pointer">
          <MyTooltip placeholder="Xem lời bài hát" offset={20}>
            <GiMicrophone></GiMicrophone>
          </MyTooltip>
        </span>
        <span className="w-8 h-8 p-[3px] mx-[2px] hidden lg:flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)] cursor-pointer">
          <MyTooltip placeholder="Chế độ cửa sổ" offset={20}>
            <VscChromeRestore className="w-5 h-5"></VscChromeRestore>
          </MyTooltip>
        </span>
        <div className="hidden items-center flex-1 md:flex">
          <span
            className="w-8 h-8 p-[3px] mx-[2px] flex-none flex items-center cursor-pointer justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]"
            onClick={() => handleVolumeBtn()}
          >
            {volumeAudio > 0 ? (
              <HiOutlineVolumeUp className="w-5 h-5" />
            ) : (
              <HiOutlineVolumeOff />
            )}
          </span>
          <div className="h-[15px] w-[70px] flex-1 flex items-center">
            <input
              type="range"
              name="volume"
              min={0}
              max={100}
              defaultValue={volumeAudio}
              className="customProgressBar"
              ref={progressRef}
            />
          </div>
        </div>
        <span className="h-8 mx-5 w-[1px] bgActive"></span>
        <span
          className="w-[30px] h-7 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded bgPrimary cursor-pointer"
          onClick={handleToggle}
        >
          <MyTooltip placeholder="Danh sách phát" offset={20}>
            <MdOutlineQueueMusic className="w-5 h-5"></MdOutlineQueueMusic>
          </MyTooltip>
        </span>
      </div>
    </div>
  );
};

export default ControllRight;
