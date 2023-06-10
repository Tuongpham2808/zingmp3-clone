import React from "react";
import ZingchartIcon from "../utils/iconsOther/ZingchartIcon";
import { useDispatch } from "react-redux";
import {
  setCurSongId,
  setIsPlaying,
  setListSongs,
  setRelatedsong,
} from "../store/musicSlice";
import * as apis from "../apis/music";
import { PromoteSongRandomId } from "../utils/fnSong";

const ZingchartPlayHead = ({
  tyle = "small",
  zingchartData = [],
  title = "#Zingchart",
}) => {
  const dispatch = useDispatch();
  let id = zingchartData?.filter((item) => item?.streamingStatus !== 2)?.[0]
    ?.encodeId;
  //play first song zing chart
  async function fetchDataPlay() {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(PromoteSongRandomId());
    // console.log(res2);
    if (res2?.data?.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(setListSongs(zingchartData));
  }
  let styleHead = {};

  switch (tyle) {
    case "small":
      styleHead = {
        classText: "text-3xl titleZingchart",
        classIcon: "w-8 h-8",
      };
      break;
    case "normal":
      styleHead = {
        classText: "text-2xl font-bold textPrimary",
        classIcon: "w-8 h-8",
      };
      break;
    case "large":
      styleHead = {
        classText: "text-[40px] leading-[48px] titleZingchart",
        classIcon: "w-10 h-10",
      };
      break;

    default:
      styleHead = {};
      break;
  }
  return (
    <div className="flex gap-x-[10px] items-center mb-5">
      <h3
        className={`font-bold capitalize inline-block ${styleHead.classText}`}
      >
        {title}
      </h3>
      <button
        className={`cursor-pointer flex items-center ${styleHead.classIcon}`}
        onClick={fetchDataPlay}
      >
        <ZingchartIcon></ZingchartIcon>
      </button>
    </div>
  );
};

export default ZingchartPlayHead;
