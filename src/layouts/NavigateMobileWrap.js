import React from "react";
import { menu } from "../utils/menu";
import { NavLink } from "react-router-dom";
import { v4 } from "uuid";
import { MdOutlineQueueMusic } from "react-icons/md";
import {
  setTogglePlaySongMobile,
  setToggleSBR,
} from "../store/responsiveSlice";
import { useDispatch, useSelector } from "react-redux";
import GroupBtn from "../components/GroupBtn";
import MyTooltip from "../components/MyTooltip";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import LoadingIcon from "../utils/iconsOther/LoadingIcon";

const NavigateMobileWrap = () => {
  const { isOpenSBR, isOpenPlaySongMobile } = useSelector(
    (state) => state.screen
  );
  const { listSongs, isPlaying, loading, dataCurSong } = useSelector(
    (state) => state.music
  );
  const dispatch = useDispatch();

  return (
    <div className="block sm:hidden w-full hPlayControll relative bottom-0 right-0 left-0">
      <div className="grid grid-cols-5 w-full player-controlls hPlayControll bgPlayer">
        {menu.length > 0 &&
          menu?.map((item) => (
            <NavLink
              to={item.url}
              key={v4()}
              className={({ isActive }) =>
                isActive
                  ? "isActive text-[var(--bg-primary)] flex gap-3 items-center justify-center py-3 px-5"
                  : "textSBL flex gap-3 items-center justify-center py-3 px-5"
              }
              onClick={item?.onClick}
            >
              <span className="flex-col items-center justify-center text-center">
                <span className="flex items-center justify-center mb-[6px]">
                  {item.icon}
                </span>
                <span className="block text-xs font-medium xs:text-sm xs:font-semibold whitespace-nowrap">
                  {item.title}
                </span>
              </span>
            </NavLink>
          ))}
        <span
          className="textSBL flex gap-3 items-center justify-center py-3 px-5 cursor-pointer"
          onClick={() => dispatch(setToggleSBR(!isOpenSBR))}
        >
          <span className="flex-col items-center justify-center text-center">
            <span className="flex items-center justify-center mb-[6px] text-[var(--bg-primary)]">
              <MdOutlineQueueMusic className="w-6 h-6"></MdOutlineQueueMusic>
            </span>
            <span className="block text-xs font-medium xs:text-sm xs:font-semibold whitespace-nowrap">
              Danh sách
            </span>
          </span>
        </span>
      </div>
      {listSongs?.length > 0 || isPlaying ? (
        <div className="player-mobile absolute left-0 flex sm:hidden items-center right-0 bottom-[var(--height-playControll)] z-20 px-3 py-2 bgPlayer border-b-[1px] border-[var(--bg-transparent1)]">
          <div
            className="flex items-center gap-3 overflow-hidden cursor-pointer"
            onClick={() =>
              dispatch(setTogglePlaySongMobile(!isOpenPlaySongMobile))
            }
          >
            <span className="hover:opacity-80 flex-shrink-0">
              <img
                src={dataCurSong?.thumbnailM}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
            <div className="flex flex-col items-start justify-center text-xs font-medium">
              <p className="textPrimary limit2LineText">{dataCurSong?.title}</p>
              <p className="textSecondary2 text1Line2">
                {dataCurSong?.artistsNames}
              </p>
            </div>
          </div>
          <div className="flex items-center ml-auto">
            <GroupBtn>
              <MyTooltip placeholder="Phát trước đó" offset={20}>
                <IoPlaySkipBack
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    document?.querySelector(".btn-prev")?.click();
                  }}
                ></IoPlaySkipBack>
              </MyTooltip>
            </GroupBtn>
            <div className="w-[50px] h-[50px] p-[5px] flex items-center justify-center">
              <span
                className="w-10 h-10 mx-[7px] flex-none flex items-center justify-center cursor-pointer select-none textPrimary2 border-[1px] hover:border-[var(--bg-primary)] rounded-full"
                onClick={() => {
                  document?.querySelector(".btn-play")?.click();
                }}
              >
                {loading ? (
                  <LoadingIcon />
                ) : isPlaying ? (
                  <IoPause className="w-5 h-5" />
                ) : (
                  <IoPlay className="w-5 h-5 translate-x-[1px]" />
                )}
              </span>
            </div>
            <GroupBtn>
              <MyTooltip placeholder="Phát tiếp theo" offset={20}>
                <IoPlaySkipForward
                  className="w-5 h-5 cursor-pointer select-none"
                  onClick={() => {
                    document?.querySelector(".btn-next")?.click();
                  }}
                ></IoPlaySkipForward>
              </MyTooltip>
            </GroupBtn>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavigateMobileWrap;
