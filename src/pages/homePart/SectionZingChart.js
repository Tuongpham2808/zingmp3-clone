import React from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import ChartRank from "../../components/ChartRank";
import ZingchartPlayHead from "../../components/ZingchartPlayHead";
import BtnMore from "../../components/BtnMore";
import CardMedia from "../../components/CardMedia";

const SectionZingChart = () => {
  const { zingchartData, rankchartData } = useSelector((state) => state.home);

  return (
    <div className="sm:p-5 p-3 rounded-lg bgChart min-h-[374px]">
      <ZingchartPlayHead zingchartData={zingchartData}></ZingchartPlayHead>
      <div className="grid xl:grid-cols-5 w-full gap-x-7">
        <div className="xl:col-start-1 xl:col-span-2 flex flex-col gap-y-[10px]">
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
        <div className="xl:col-start-3 xl:col-span-3 xs:block hidden h-full">
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
