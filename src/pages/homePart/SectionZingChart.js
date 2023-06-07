import React, { useEffect, useState } from "react";
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
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const SectionZingChart = () => {
  const [data, setData] = useState();
  const [tooltipState, setTooltipState] = useState();
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

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      toolTip: {
        enabled: false,
        external: ({ tooltip }) => {
          console.log(tooltip);
        },
      },
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: { drawTicks: false, color: "rgba(255,255,255,0.1" },
        min: rankchartData?.minScore,
        max: rankchartData?.maxScore,
        border: { dash: [2, 6], color: "transparent" },
      },
      x: {
        ticks: { color: "rgba(255,255,255,0.5" },
        grid: { color: "transparent", drawDashedLine: [0, 0] },
        border: { color: "transparent" },
      },
    },
    layout: {
      padding: {
        bottom: 0,
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    let labels;
    let datasets = [];
    if (rankchartData?.items) {
      labels = rankchartData?.times
        ?.filter((item) => +item?.hour % 2 !== 0)
        ?.map((item) => item?.hour + ":00");
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: rankchartData?.items?.[
            Object.keys?.(rankchartData?.items || {})?.[i]
          ]
            ?.filter((i) => +i?.hour % 2 !== 0)
            ?.map((item) => item?.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.25,
          borderWidth: 2,
          pointBackgroundColor: "white",
          pointHoverRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 2.5,
        });
      }
    }
    setData({ labels, datasets });
  }, [rankchartData]);

  return (
    <div className="p-5 rounded-lg bgChart min-h-[374px]">
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
      <div className="flex items-center w-full gap-x-7">
        <div className="flex-[40%] flex flex-col gap-y-[10px]">
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
          <div className="text-center">
            <button className="md:px-6 mx-auto py-1 px-3 md:text-sm text-xs font-normal text1Line uppercase rounded-full outline outline-1 outline-[var(--text-secondary)] mt-2">
              Xem thêm
            </button>
          </div>
        </div>
        <div className="flex-[60%] w-full h-auto">
          <div className="w-full flex items-end max-h-[300px] mb-5 ">
            {data && (
              <Line options={options} data={data} className="w-full"></Line>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionZingChart;
