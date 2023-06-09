import React, { memo } from "react";
import MyTooltip from "./MyTooltip";
import { FiMoreHorizontal } from "react-icons/fi";
import { formatTime } from "../utils/fnTime";
import ImageMedia from "./ImageMedia";
import { useDispatch, useSelector } from "react-redux";
import {
  setRelatedsong,
  setCurSongId,
  setIsPlaying,
  setListSongs,
} from "../store/musicSlice";
import * as apis from "../apis";
import PremiumIcon from "../utils/iconsOther/PremiumIcon";
import { toast } from "react-toastify";
import { PromoteSongRandomId } from "../utils/fnSong";
import { HiOutlineHeart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";

const CardMedia = ({
  title = "Chàng trai năm đó",
  image = "https://source.unsplash.com/random/?man",
  artists = "Sơn Tùng",
  time = "2 giờ trước",
  id = "",
  type = "normal",
  played = false,
  zingchart = false,
  rankNumber = 1,
  choicePersen = "40%",
  color = "",
  streamingStatus = 1,
  isSBR = false,
  isPlaylist = false,
  link = "#",
}) => {
  const { isOpenSBR } = useSelector((state) => state.screen);
  let styles = {};
  switch (type) {
    case "normal":
      styles = {
        classImage: `${
          zingchart ? "sm:w-[60px] sm:h-[60px] w-10 h-10 " : "w-[60px] h-[60px]"
        }`,
        classIcon: "w-[46px] h-[46px]",
        classGroup: `${zingchart ? "sm:p-[10px] p-[6px]" : "p-[10px]"}`,
        classBtn: "w-8 h-8",
        classSizeIcon: "w-5 h-5",
        date: true,
      };
      break;
    case "small":
      styles = {
        classImage: "w-10 h-10",
        classIcon: "w-7 h-7",
        classGroup: "p-2",
        classBtn: "w-[26px] h-[26px]",
        classSizeIcon: "w-4 h-4",
        date: false,
      };
      break;
    case "suggestSearch":
      styles = {
        classImage: "w-[52px] h-[52px]",
        classIcon: "w-[46px] h-[46px]",
        classGroup: "p-2",
        classBtn: "w-[38px] h-[38px]",
        classSizeIcon: "w-5 h-5 textSecondary2",
        date: false,
      };
      break;
    case "chartTooltip":
      styles = {
        classImage: "w-10 h-10",
        classIcon: "w-[46px] h-[46px]",
        classGroup: "p-[10px]",
        classBtn: "w-8 h-8",
        classSizeIcon: "w-5 h-5",
        date: false,
      };
      break;

    default:
      styles = {};
      break;
  }
  const { newReleaseData } = useSelector((state) => state.home);
  const { curSongId } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const timeFormat = formatTime(time);
  //Thực hiện lấy ra list nhạc mới nhất thông qua id
  async function fetchDataRelated(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(PromoteSongRandomId());
    if (res2.data.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(
      setListSongs([].concat(newReleaseData.vPop, newReleaseData.others))
    );
  }
  function fetchData(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
  }

  const handleSelectSongDoubleClick = (id) => {
    if (id !== "") {
      if (streamingStatus === 2) {
        toast.warning(
          "Để nghe bài hát này bạn cần nâng cấp tài khoản thành PREMIUM"
        );
      } else {
        if (type === "small") {
          fetchData(id);
        } else {
          fetchDataRelated(id);
        }
      }
    }
  };
  const handleSelectSongClick = (id) => {
    if (id !== "") {
      if (streamingStatus === 2) {
        toast.warning(
          "Để nghe bài hát này bạn cần nâng cấp tài khoản thành PREMIUM"
        );
      } else {
        if (type === "small") {
          fetchData(id);
        } else {
          fetchDataRelated(id);
        }
      }
    }
  };

  return (
    <Link
      to={link}
      onClick={link === "# " ? (e) => e.preventDefault() : () => {}}
      className="w-full"
    >
      <div
        className={`group rounded items-center w-full sm:gap-x-[10px] gap-x-[6px] select-none card-media ${
          styles.classGroup
        } ${played ? "opacity-50" : ""} ${
          curSongId === id && isSBR
            ? "bg-[var(--bg-primary-hover)] playing"
            : curSongId === id
            ? "bg-[var(--bg-transparent1)] playing"
            : "flex"
        } ${isOpenSBR ? " active" : " unactive"} ${
          zingchart
            ? "bg-[var(--bg-transparent4)] hover:bg-[var(--bg-transparent3)] sm:py-[10px] sm:px-[15px] p-3 flex"
            : "py-[10px] px-[15px]"
        } ${
          type === "chartTooltip"
            ? "py-[5px] pl-[5px] pr-[10px]"
            : "hover:bg-[var(--bg-transparent1)]"
        }`}
        onDoubleClick={() => handleSelectSongDoubleClick(id)}
        style={{ background: color }}
      >
        {type === "chartTooltip" ? (
          ""
        ) : zingchart ? (
          <div className="flex items-start justify-center px-1 mr-[5px]">
            <span
              className={`text-[32px] font-black leading-[1] text-transparent ${
                rankNumber === 1
                  ? "strokeText1"
                  : rankNumber === 2
                  ? "strokeText2"
                  : "strokeText3"
              }`}
            >
              {rankNumber}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="flex gap-x-[10px] w-full items-center overflow-hidden">
          <ImageMedia
            image={image}
            classImage={styles.classImage}
            tyle="normal"
            onClick={() => handleSelectSongClick(id)}
            id={id}
            isPlaylist={isPlaylist}
            link={link}
          ></ImageMedia>
          <div className="w-full overflow-hidden">
            <div className="flex items-center gap-x-2">
              <h3
                className={`text-sm font-medium text1Line ${
                  streamingStatus === 2 ? "textSecondary2" : "textPrimary"
                }`}
              >
                {title}
              </h3>
              {streamingStatus === 2 && (
                <div className="w-14 flex-shrink-0">
                  <PremiumIcon />
                </div>
              )}
            </div>
            <div className="text-xs font-medium mt-[3px] cursor-pointer text1Line flex items-center">
              {isPlaylist && (
                <span className="flex items-center textSecondary">
                  Playlist <BsDot className="w-6 h-6 -mx-1 -my-[2px]" />
                </span>
              )}
              <p
                className={`text1Line ${
                  type === "chartTooltip"
                    ? "text-white"
                    : curSongId === id && isSBR
                    ? "textSBL"
                    : "textSecondary"
                }`}
              >
                {artists}
              </p>
            </div>
            {styles.date && (
              <p className="text-xs font-medium mt-[3px] text1Line textSecondary2">
                {timeFormat}
              </p>
            )}
          </div>
        </div>
        {!zingchart && (
          <div className="flex items-center">
            {type === "suggestSearch" && (
              <div
                className={`hidden items-center justify-center flex-shrink-0 group-hover:flex ${styles.classIcon}`}
              >
                <span
                  className={`w-8 h-8 p-[3px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)] cursor-pointer ${styles.classBtn} `}
                >
                  <MyTooltip placeholder="Thêm vào thư viện" offset={20}>
                    <HiOutlineHeart
                      className={styles.classSizeIcon}
                    ></HiOutlineHeart>
                  </MyTooltip>
                </span>
              </div>
            )}
            <div
              className={`hidden items-center justify-center flex-shrink-0 group-hover:flex ${styles.classIcon}`}
            >
              <span
                className={`w-8 h-8 p-[3px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)] cursor-pointer ${styles.classBtn} `}
              >
                <MyTooltip placeholder="Khác" offset={20}>
                  <FiMoreHorizontal
                    className={styles.classSizeIcon}
                  ></FiMoreHorizontal>
                </MyTooltip>
              </span>
            </div>
          </div>
        )}
        {zingchart && (
          <div className="hidden items-center sm:flex justify-center">
            <span className="whitespace-nowrap textPrimary text-base font-bold">
              {choicePersen}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default memo(CardMedia);
