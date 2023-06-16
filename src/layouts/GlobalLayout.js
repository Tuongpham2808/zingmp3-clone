import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import ControllPlayerWrap from "./ControllPlayerWrap";
import SidebarRight from "./SidebarRight";
import HeaderContent from "./HeaderContent";
import { useDispatch, useSelector } from "react-redux";
import NavigateMobileWrap from "./NavigateMobileWrap";
import { setTogglePlaySongMobile } from "../store/responsiveSlice";
import { HiOutlineChevronDown } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupBtn from "../components/GroupBtn";
import MyTooltip from "../components/MyTooltip";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeatOutline,
  IoShuffleOutline,
} from "react-icons/io5";
import LoadingIcon from "../utils/iconsOther/LoadingIcon";
import { LuRepeat1 } from "react-icons/lu";
import { formatTimeProgress } from "../utils/fnTime";

const GlobalLayout = () => {
  const { isOpenSBR, isOpenPlaySongMobile } = useSelector(
    (state) => state.screen
  );
  const { isPlaying, randomSong, repeatSong, loading, dataCurSong, listSongs } =
    useSelector((state) => state.music);
  const dispatch = useDispatch();
  const imagePlayRef = useRef();
  const musicCurrentTimeRef = useRef();
  const musicTotalLengthRef = useRef();
  const progressRef = useRef();
  const [audioProgress, setAudioProgress] = useState(0);
  let cdThumbAnimate = imagePlayRef?.current?.animate(
    [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
    {
      duration: 10000,
      iterations: Infinity,
    }
  );
  useEffect(() => {
    if (isPlaying) {
      cdThumbAnimate?.play();
    } else {
      cdThumbAnimate?.pause();
    }
  }, [cdThumbAnimate, isPlaying]);

  let currentAudio = document.querySelector(".song-play");
  //ontimeUpdate progress song change
  function handleAudioUpdate(e) {
    //Input current time of the audio
    let minutes = Math.floor(currentAudio?.currentTime / 60);
    let seconds = Math.floor(currentAudio?.currentTime % 60);
    let audioCurrentTime = formatTimeProgress(minutes, seconds);
    if (musicCurrentTimeRef.current) {
      musicCurrentTimeRef.current.innerText = audioCurrentTime;
    }
    if (currentAudio?.duration) {
      const progressPercent = Math.floor(
        (currentAudio?.currentTime / currentAudio?.duration) * 100
      );
      progressRef.current.value = progressPercent;
      progressRef.current.style.background = `linear-gradient(to right, var(--text-primary) ${progressPercent}%, var(--text-secondary) ${progressPercent}%)`;
      //Input total length of the audio
      let minutes = Math.floor(currentAudio?.duration / 60);
      let seconds = Math.floor(currentAudio?.duration % 60);
      let audioTotalTime = formatTimeProgress(minutes, seconds);
      if (musicTotalLengthRef.current) {
        musicTotalLengthRef.current.innerText = audioTotalTime;
      }
    }
  }
  useEffect(() => {
    currentAudio?.addEventListener("timeupdate", handleAudioUpdate);
    console.log(currentAudio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudio]);

  //handle click progress bar
  const handleMusicProgressBar = (e) => {
    if (currentAudio?.src) {
      setAudioProgress(e?.target?.value);
      currentAudio.currentTime =
        (e?.target?.value * currentAudio?.duration) / 100;
    }
  };

  return (
    <div className="h-screen w-full relative">
      <HeaderContent></HeaderContent>
      <div
        className={`relative flex w-full transition-all overflow-hidden h-[calc(100vh-var(--height-playControll))] ${
          listSongs.length > 0 || isPlaying
            ? "sm:h-[calc(100vh-var(--height-playControll))]"
            : "sm:h-full"
        }`}
      >
        <div className="stroke-slate-500 flex-none lg:w-[240px] w-[70px] bgSBL hidden sm:block">
          <SidebarLeft></SidebarLeft>
        </div>
        <div className="w-full overflow-hidden transition1 mr-[var(--margin-contentRight)]">
          <div className="w-full h-auto">
            <div className="md:px-[60px] sm:px-6 px-2 xs:px-4 overflow-x-hidden overflow-y-scroll h-screen hiddenScroll mainContent scroll-smooth">
              <div
                className={`mt-[70px] max-w-[1442px] mx-auto sm:pb-[120px] ${
                  listSongs?.length > 0 || isPlaying ? "pb-[170px]" : ""
                }`}
              >
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bgMain hidden sm:block blActice slideRight w-[var(--margin-SidebarRight)] overflow-hidden stroke-slate-500 flex-none h-full absolute right-0 top-0 bottom-0 z-20 ${
            isOpenSBR ? "translateX0 opacity-100" : " translateX100 opacity-0"
          }`}
        >
          <SidebarRight></SidebarRight>
        </div>
      </div>
      <NavigateMobileWrap></NavigateMobileWrap>
      {listSongs.length > 0 || isPlaying ? (
        <div
          className={`transition-all z-50 ${
            listSongs.length > 0 || isPlaying
              ? ""
              : "translate-y-full opacity-0"
          }`}
        >
          <ControllPlayerWrap></ControllPlayerWrap>
        </div>
      ) : (
        <></>
      )}
      <div
        className={`playsong-mobile cursor-pointer block sm:hidden z-50 overflow-hidden ${
          isOpenPlaySongMobile ? "active" : ""
        }`}
      >
        <div className="w-full h-full bg-gradient-to-t from-[var(--bg-main)] to-[var(--bg-modal)] p-4">
          <div className="w-full textPrimary flex items-center justify-between">
            <span
              className="w-7 h-7 flex items-center justify-center"
              onClick={() =>
                dispatch(setTogglePlaySongMobile(!isOpenPlaySongMobile))
              }
            >
              <HiOutlineChevronDown className="w-7 h-7"></HiOutlineChevronDown>
            </span>
            <span className="w-7 h-7 flex items-center justify-center">
              <BsThreeDotsVertical className="w-5 h-5"></BsThreeDotsVertical>
            </span>
          </div>
          <div className="h-1/2 max-w-[80%] xs:max-w-[60%] w-full flex items-center justify-center mx-auto">
            <div className="w-full shadow-xl rounded-full">
              <img
                src={dataCurSong?.thumbnailM}
                alt=""
                className=" rounded-full w-full"
                ref={imagePlayRef}
              />
            </div>
          </div>
          <div className="w-full h-1/2 flex flex-col items-center justify-evenly pb-8">
            <div className="w-full flex flex-col items-center">
              <h3 className="text-2xl font-medium textPrimary limit2LineText text-center capitalize mb-4">
                {dataCurSong?.title}
              </h3>
              <p className="block text-sm mb-2 font-medium text-center textSecondary text1Line">
                {dataCurSong?.artistsNames}
              </p>
              <p className="block text-sm mb-2 font-medium text-center textSecondary2 text1Line">
                {dataCurSong?.distributor}
              </p>
            </div>
            <div className="flex flex-col items-center w-[90%] gap-[10px] mb-[5px]">
              <div className="h-[15px] w-full flex-1 flex items-center">
                <input
                  type="range"
                  name="volume"
                  step="1"
                  min="0"
                  max="100"
                  value={audioProgress}
                  className="customProgressBar mobile"
                  ref={progressRef}
                  onChange={handleMusicProgressBar}
                />
              </div>
              <div className="flex items-center w-full justify-between">
                <span
                  className="w-12 text-xs font-normal text-right textPrimary"
                  ref={musicCurrentTimeRef}
                >
                  00 : 00
                </span>
                <span
                  className="w-12 text-xs font-normal text-left textPrimary"
                  ref={musicTotalLengthRef}
                >
                  04 : 38
                </span>
              </div>
            </div>

            <div className="controller-mobile flex items-center w-full justify-center mb-[3px] mt-5">
              <div className="flex items-center w-full justify-evenly">
                <GroupBtn>
                  <MyTooltip placeholder="Bật phát ngẫu nhiên" offset={20}>
                    <div
                      className="btn-shuffe"
                      onClick={() => {
                        document?.querySelector(".btn-shuffe")?.click();
                      }}
                    >
                      <IoShuffleOutline
                        className={`w-6 h-6 xs:w-7 xs:h-7 cursor-pointer select-none ${
                          randomSong ? "text-[var(--bg-primary)]" : ""
                        }`}
                      ></IoShuffleOutline>
                    </div>
                  </MyTooltip>
                </GroupBtn>
                <GroupBtn>
                  <MyTooltip placeholder="Phát trước đó" offset={20}>
                    <div
                      onClick={() => {
                        document?.querySelector(".btn-prev")?.click();
                      }}
                    >
                      <IoPlaySkipBack className="w-5 h-5 xs:w-6 xs:h-6 cursor-pointer"></IoPlaySkipBack>
                    </div>
                  </MyTooltip>
                </GroupBtn>
                <div
                  className=" w-[50px] h-[50px] p-[5px] flex items-center justify-center"
                  onClick={() => {
                    document?.querySelector(".btn-play")?.click();
                  }}
                >
                  <span className="w-10 h-10 xs:w-11 xs:h-11 mx-[7px] flex-none flex items-center justify-center cursor-pointer select-none textPrimary2 border-[1px] hover:border-[var(--bg-primary)] rounded-full">
                    {loading ? (
                      <LoadingIcon />
                    ) : isPlaying ? (
                      <IoPause className="w-5 h-5 xs:w-6 xs:h-6" />
                    ) : (
                      <IoPlay className="w-5 h-5 xs:w-6 xs:h-6 translate-x-[1px]" />
                    )}
                  </span>
                </div>
                <GroupBtn>
                  <MyTooltip placeholder="Phát tiếp theo" offset={20}>
                    <div
                      onClick={() => {
                        document?.querySelector(".btn-next")?.click();
                      }}
                    >
                      <IoPlaySkipForward className="w-5 h-5 xs:w-6 xs:h-6 cursor-pointer select-none"></IoPlaySkipForward>
                    </div>
                  </MyTooltip>
                </GroupBtn>
                <GroupBtn>
                  <MyTooltip
                    placeholder={
                      repeatSong === 0
                        ? "Bật phát lại tất cả"
                        : repeatSong === 1
                        ? "Bật phát lặp lại 1 bài"
                        : "Tắt phát lại"
                    }
                    offset={20}
                  >
                    <div
                      onClick={() => {
                        document?.querySelector(".btn-repeat")?.click();
                      }}
                    >
                      {repeatSong === 2 ? (
                        <LuRepeat1 className="w-5 h-5 xs:w-6 xs:h-6 cursor-pointer select-none text-[var(--bg-primary)]" />
                      ) : (
                        <IoRepeatOutline
                          className={`w-6 h-6 xs:w-6 xs:h-6 cursor-pointer select-none ${
                            repeatSong ? "text-[var(--bg-primary)]" : ""
                          }`}
                        />
                      )}
                    </div>
                  </MyTooltip>
                </GroupBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
