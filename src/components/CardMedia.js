import React from "react";
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
}) => {
  const { isOpenSBR } = useSelector((state) => state.screen);
  let styles = {};
  switch (type) {
    case "normal":
      styles = {
        classImage: "w-[60px] h-[60px]",
        classIcon: "w-[46px] h-[46px]",
        classGroup: "p-[10px]",
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
    case "chartTooltip":
      styles = {
        classImage: "w-10 h-10",
        classIcon: "w-7 h-7",
        classGroup: "p-2",
        classBtn: "w-[26px] h-[26px]",
        classSizeIcon: "w-4 h-4",
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

  async function fetchDataRelated(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(id);
    if (res2.data.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(
      setListSongs([].concat(newReleaseData.vPop, newReleaseData.others))
    );
  }
  async function fetchData(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
  }

  const handleSelectSongDoubleClick = (id) => {
    if (type === "small") {
      fetchData(id);
    } else {
      fetchDataRelated(id);
    }
  };
  const handleSelectSongClick = (id) => {
    if (type === "small") {
      fetchData(id);
    } else {
      fetchDataRelated(id);
    }
  };

  return (
    <div
      className={`group rounded  items-center w-full gap-x-[10px] select-none card-media ${
        styles.classGroup
      } ${played ? "opacity-50" : ""} ${
        curSongId === id ? "bg-[var(--bg-transparent1)] playing" : "flex"
      } ${isOpenSBR ? " active" : " unactive"} ${
        zingchart
          ? "bg-[var(--bg-transparent4)] hover:bg-[var(--bg-transparent3)] py-[10px] px-[15px] flex"
          : ""
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
        ></ImageMedia>
        <div className="w-full overflow-hidden">
          <h3 className="text-sm font-medium text1Line">{title}</h3>
          <p
            className={`text-xs font-medium mt-[3px] cursor-pointer text1Line ${
              type === "chartTooltip" ? "text-white" : "textSecondary"
            }`}
          >
            {artists}
          </p>
          {styles.date && (
            <p className="text-xs font-medium mt-[3px] text1Line textSecondary2">
              {timeFormat}
            </p>
          )}
        </div>
      </div>
      {!zingchart && (
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
      )}
      {zingchart && (
        <div className="flex items-center justify-center">
          <span className="whitespace-nowrap textPrimary text-base font-bold">
            {choicePersen}
          </span>
        </div>
      )}
    </div>
  );
};

export default CardMedia;
