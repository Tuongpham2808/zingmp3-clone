import React from "react";
import { CardMedia } from "../../components";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import ChartRank from "../../components/ChartRank";
import ZingchartPlayHead from "../../components/ZingchartPlayHead";
import BtnMore from "../../components/BtnMore";

const SectionZingChart = () => {
  const { zingchartData, rankchartData } = useSelector((state) => state.home);

  return (
    <div className="p-5 rounded-lg bgChart min-h-[374px]">
      <ZingchartPlayHead zingchartData={zingchartData}></ZingchartPlayHead>
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
              choicePersen={
                Math.round((+item?.score * 100) / +rankchartData?.totalScore) +
                "%"
              }
              id={item?.encodeId}
            ></CardMedia>
          ))}
          <div className="text-center">
            <BtnMore link="/zing-chart"></BtnMore>
          </div>
        </div>
        <div className="flex-[60%] h-full">
          <ChartRank
            zingchartData={zingchartData}
            rankchartData={rankchartData}
          ></ChartRank>
        </div>
      </div>
    </div>
  );
};

export default SectionZingChart;
