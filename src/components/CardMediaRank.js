import React from "react";
import ImageMedia from "./ImageMedia";
import CoverIcon from "./CoverIcon";
import { MdOndemandVideo } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { HiOutlineHeart } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineMinus, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../utils/fnTime";
import {
  setCurSongId,
  setIsPlaying,
  setListSongs,
  setRelatedsong,
} from "../store/musicSlice";
import * as apis from "../apis";

const CardMediaRank = ({
  image = "https://source.unsplash.com/random/?man",
  title = "Kẻ viết ngôn tình",
  artists = "Châu Khải Phong",
  titleAlbum = "Kẻ viết ngôn tình (Single)",
  linkAlbum = "",
  durations = "03:56",
  rankNumber = 0,
  rank = false,
  id = "",
  size = "large",
  rakingStatus = 0,
}) => {
  const { curSongId } = useSelector((state) => state.music);
  const { zingchartData } = useSelector((state) => state.zingchart);
  const dispatch = useDispatch();

  async function fetchDataRelated(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(id);
    if (res2.data.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(setListSongs(zingchartData));
  }
  // async function fetchData(id) {
  //   dispatch(setCurSongId(id));
  //   dispatch(setIsPlaying(true));
  // }

  const handleSelectSongDoubleClick = (id) => {
    fetchDataRelated(id);
  };
  const handleSelectSongClick = (id) => {
    fetchDataRelated(id);
  };

  return (
    <div
      className="suggest flex items-center p-[10px] rounded hover:bg-[var(--bg-transparent1)] group"
      onDoubleClick={() => handleSelectSongDoubleClick(id)}
    >
      <div
        className={`flex items-center ${size === "small" ? "w-5/6" : "w-1/2"}`}
      >
        <div
          className={`mr-[15px] flex items-center ${
            size === "small" ? "w-[55px]" : "w-[83px]"
          }`}
        >
          {rank ? (
            <div className={`flex items-center justify-center px-1 mr-[5px]`}>
              <span
                className={`text-[32px] font-black leading-[1] flex items-center justify-center text-transparent text1Line ${
                  rankNumber === 1
                    ? "strokeText1"
                    : rankNumber === 2
                    ? "strokeText2"
                    : rankNumber === 3
                    ? "strokeText3"
                    : "strokeText4"
                } ${size === "small" ? "w-[35px]" : "w-[65px]"}`}
              >
                {rankNumber}
              </span>
              <span className="w-[18px] flex flex-col items-center justify-center">
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
            <p className="textSecondary2 text-sm font-medium w-[83px] flex items-center justify-center px-1 mr-[5px]">
              Gợi ý
            </p>
          )}
        </div>
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
              <h3 className="text-sm font-medium text1Line capitalize">
                {title}
              </h3>
              <p className="text-xs font-medium mt-[3px] capitalize cursor-pointer text1Line textSecondary">
                {artists}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-[10px] w-1/2">
        {size !== "small" && (
          <div className="">
            <Link to={linkAlbum}>
              <p className="text-xs font-medium mt-[3px] cursor-pointer text1Line textSecondary text-left text1Line">
                {titleAlbum}
              </p>
            </Link>
          </div>
        )}
        <div className="flex-shrink-0 ml-auto">
          <span className="text-xs font-medium mt-[3px] cursor-pointer text1Line textSecondary group-hover:hidden text-right">
            {durations}
          </span>
          <div>
            <div className="hidden items-center group-hover:flex">
              {size !== "small" && (
                <CoverIcon placeholder="Xem MV">
                  <MdOndemandVideo className="w-5 h-5"></MdOndemandVideo>
                </CoverIcon>
              )}
              <CoverIcon placeholder="Phát cùng lời bài hát">
                <GiMicrophone></GiMicrophone>
              </CoverIcon>
              {size !== "small" && (
                <CoverIcon placeholder="Thêm vào thư viện">
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

export default CardMediaRank;
