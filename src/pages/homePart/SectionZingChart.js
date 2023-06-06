import React, { useEffect } from "react";
import ZingchartIcon from "../../utils/iconsOther/ZingchartIcon";
import { CardMedia } from "../../components";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurSongId,
  setIsPlaying,
  setListSongs,
  setRelatedsong,
} from "../../store/musicSlice";
import * as apis from "../../apis/music";

const SectionZingChart = () => {
  const { zingchartData, rankchartData } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  let id = zingchartData[0]?.encodeId;
  //play first song zing chart
  async function fetchDataPlay() {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(id);
    console.log(res2);
    if (res2.data.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(setListSongs(zingchartData));
  }
  useEffect(() => {
    let labels = rankchartData?.times
      ?.filter((item) => +item?.hour % 2 !== 0)
      .map((item) => item?.hour);
    let datasets = [];
    if (rankchartData?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: rankchartData?.items[Object.keys(rankchartData?.items)[i]]
            ?.filter((i) => +i.hour % 2 !== 0)
            ?.map((item) => item?.counter),
        });
      }
    }
  }, [rankchartData, rankchartData?.items, rankchartData?.times]);

  return (
    <div className="overflow-hidden p-5 rounded-lg bgChart min-h-[374px]">
      <div className="flex gap-x-[10px] items-center mb-5">
        <h3 className="text-3xl font-bold capitalize titleZingchart inline-block">
          #Zingchart
        </h3>
        <button
          className="cursor-pointer w-8 h-8 flex items-center"
          onClick={fetchDataPlay}
        >
          <ZingchartIcon></ZingchartIcon>
        </button>
      </div>
      <div className="flex items-center w-full -mx-[15px]">
        <div className="flex-[40%] px-[14px] flex flex-col gap-y-[10px]">
          {zingchartData?.slice(0, 3).map((item, index) => (
            <CardMedia
              key={v4()}
              zingchart={true}
              artists={item?.artistsNames}
              title={item.title}
              image={item.thumbnail}
              rankNumber={index + 1}
              choicePersen={"40%"}
              id={item?.encodeId}
            ></CardMedia>
          ))}
        </div>
        <div className="flex-[60%] px-[14px]"></div>
      </div>
    </div>
  );
};

export default SectionZingChart;
