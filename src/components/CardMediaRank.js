import React, { memo } from "react";
import ImageMedia from "./ImageMedia";
import CoverIcon from "./CoverIcon";
import { MdOndemandVideo } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { HiOutlineHeart } from "react-icons/hi";
import { FiMoreHorizontal, FiMusic } from "react-icons/fi";
import { AiOutlineMinus, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurSongId,
  setIsPlaying,
  setListSongs,
  setPlayAlbum,
  setRelatedsong,
} from "../store/musicSlice";
import * as apis from "../apis";
import PremiumIcon from "../utils/iconsOther/PremiumIcon";
import { toast } from "react-toastify";
import { PromoteSongRandomId } from "../utils/fnSong";

const CardMediaRank = ({
  image = "https://source.unsplash.com/random/?man",
  title = "",
  artists = "",
  titleAlbum = "",
  linkAlbum = "",
  durations = "03:56",
  rankNumber = 0,
  rank = false,
  disPlayRank = true,
  id = "",
  size = "large",
  rakingStatus = 0,
  streamingStatus = 1,
  listSongsRight = [],
  isPlaylist = false,
}) => {
  const { curSongId } = useSelector((state) => state.music);
  const { zingchartData } = useSelector((state) => state.zingchart);
  const dispatch = useDispatch();
  //lấy dữ liệu và dispatch tới danh sách phát listsongs của music
  async function fetchDataRelated(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    dispatch(setListSongs(listSongsRight || zingchartData));
    dispatch(setPlayAlbum(true));
  }

  const handleSelectSongDoubleClick = (id) => {
    if (streamingStatus === 2) {
      toast.warning(
        "Để nghe bài hát này bạn cần nâng cấp tài khoản thành PREMIUM"
      );
    } else {
      fetchDataRelated(id);
    }
  };
  const handleSelectSongClick = (id) => {
    if (streamingStatus === 2) {
      toast.warning(
        "Để nghe bài hát này bạn cần nâng cấp tài khoản thành PREMIUM"
      );
    } else {
      fetchDataRelated(id);
    }
  };

  return (
    <div
      className={`suggest w-full flex items-center overflow-hidden p-[6px] xs:p-[10px] rounded group cursor-pointer ${
        id === curSongId
          ? "bg-[var(--bg-transparent1)] playing"
          : "hover:bg-[var(--bg-transparent1)]"
      }`}
      onDoubleClick={() => handleSelectSongDoubleClick(id)}
    >
      <div
        className={`flex items-center pr-3 ${
          size === "small"
            ? " w-[85%] xs:w-[85%] md:max-w-[80%]"
            : " w-[85%]  xs:w-[75%] md:w-1/2"
        }`}
      >
        {isPlaylist ? (
          <span className="w-4 mr-[10px]">
            <FiMusic className="w-4 h-4 textSecondary2"></FiMusic>
          </span>
        ) : disPlayRank ? (
          <div
            className={`xs:mr-[15px] flex items-center ${
              size === "small" ? "hidden xs:w-[55px]" : "w-[83px]"
            }`}
          >
            {rank ? (
              <div className={`flex items-center justify-center px-1 mr-[5px]`}>
                <span
                  className={`xs:text-[32px] text-2xl font-black leading-[1] flex items-center justify-center text-transparent text1Line ${
                    rankNumber === 1
                      ? "strokeText1"
                      : rankNumber === 2
                      ? "strokeText2"
                      : rankNumber === 3
                      ? "strokeText3"
                      : "strokeText4"
                  } ${size === "small" ? "w-[35px]" : "xs:w-[65px] w-12"}`}
                >
                  {rankNumber}
                </span>
                <span className="w-[18px] hidden xs:flex flex-col items-center justify-center">
                  {rakingStatus !== 0 ? (
                    <>
                      <span className="w-[18px] h-[18px] flex items-center justify-center">
                        {rakingStatus > 0 ? (
                          <AiFillCaretUp className="text-[#50e3c2]" />
                        ) : (
                          <AiFillCaretDown className="text-[#e35050]" />
                        )}
                      </span>
                      <span className="w-[18px] h-[18px] flex items-center justify-center text-xs font-bold">
                        {Math.abs(rakingStatus)}
                      </span>
                    </>
                  ) : (
                    <AiOutlineMinus className="textSecondary" />
                  )}
                </span>
              </div>
            ) : (
              <p className="textSecondary2 text-sm font-medium w-[63px] xs:w-[83px] flex items-center justify-center px-1">
                Gợi ý
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className="w-full flex items-center justify-start overflow-hidden">
          <ImageMedia
            classImage="w-10 h-10"
            tyle="normal"
            image={image}
            id={id}
            onClick={() => handleSelectSongClick(id)}
          ></ImageMedia>
          <div className="ml-[10px] overflow-hidden">
            <div className="w-full overflow-hidden">
              <div className="flex items-center gap-x-2 overflow-hidden">
                <div className="overflow-hidden">
                  <h3 className="text-sm font-medium text1Line textPrimary ">
                    {title}
                  </h3>
                </div>
                {streamingStatus === 2 && (
                  <div className="w-14 flex-shrink-0">
                    <PremiumIcon />
                  </div>
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium mt-[3px] capitalize cursor-pointer text1Line textSecondary">
                  {artists}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between gap-x-[10px] w-full
       md:w-1/2"
      >
        {size !== "small" && (
          <div className="pr-3 hidden md:flex overflow-hidden">
            <Link to={linkAlbum}>
              <p className="text-xs font-medium mt-[3px] cursor-pointer text1Line textSecondary text-left">
                {titleAlbum}
              </p>
            </Link>
          </div>
        )}
        <div className="flex-none ml-auto overflow-hidden">
          <span className="text-xs ml-auto font-medium mt-[3px] xs:block hidden cursor-pointer text1Line textSecondary group-hover:hidden text-right">
            {durations}
          </span>
          <div className="ml-auto">
            <div className="hidden items-center group-hover:flex overflow-hidden min-w-[38px] xs:min-w-[76px]">
              {size !== "small" && (
                <CoverIcon placeholder="Xem MV" className="md:flex hidden">
                  <MdOndemandVideo className="w-5 h-5"></MdOndemandVideo>
                </CoverIcon>
              )}
              <CoverIcon
                placeholder="Phát cùng lời bài hát"
                className="xs:flex hidden"
              >
                <GiMicrophone></GiMicrophone>
              </CoverIcon>
              {size !== "small" && (
                <CoverIcon
                  placeholder="Thêm vào thư viện"
                  className="sm:flex hidden"
                >
                  <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
                </CoverIcon>
              )}
              <CoverIcon placeholder="Khác">
                <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
              </CoverIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CardMediaRank);
