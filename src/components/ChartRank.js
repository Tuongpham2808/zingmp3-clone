import React, { memo, useEffect, useRef, useState } from "react";
import CardMedia from "./CardMedia";
import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { isEqual } from "lodash";

const ChartRank = ({ zingchartData, rankchartData }) => {
  const [data, setData] = useState();
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
    color: "",
  });
  const [tooltipData, setTooltipData] = useState(null);
  const chartRef = useRef();

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip, chart }) => {
          let counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              encodeId: Object.keys(rankchartData?.items || {})?.[i],
              data: rankchartData?.items?.[
                Object.keys(rankchartData?.items || {})?.[i]
              ]
                ?.filter((item) => +item?.hour !== 2)
                ?.map((item) => +item?.counter),
            });
          }
          setTooltipData(
            counters?.find((item) =>
              item?.data?.some(
                (i) => i === +tooltip?.body?.[0]?.lines?.[0]?.replace(".", "")
              )
            )?.encodeId
          );
          if (tooltip?.opacity === 0) {
            if (tooltipState?.opacity !== 0) {
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
              return;
            }
          }
          let newToolTipData = {
            opacity: 1,
            left: tooltip?.caretX,
            top: tooltip?.caretY,
            color: tooltip?.labelColors?.[0]?.borderColor,
          };
          if (!isEqual(tooltip, newToolTipData)) {
            setTooltipState(newToolTipData);
          }
        },
      },
    },
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
          color: "rgba(255,255,255,0.1",
        },
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
      mode: "index",
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
  }, [rankchartData?.items, rankchartData?.times]);
  return (
    <div className="flex items-end max-h-[250px] xl:max-h-[300px] mb-5 relative">
      {data && (
        <Line
          options={options}
          data={data}
          ref={chartRef}
          className="!w-full"
        ></Line>
      )}
      <div
        className="toolTip h-auto z-30 max-w-[200px]"
        style={{
          top: tooltipState?.top,
          left: tooltipState?.left,
          opacity: tooltipState?.opacity,
          position: "absolute",
        }}
      >
        <CardMedia
          zingchart={true}
          order={tooltipState?.order}
          type="chartTooltip"
          color={tooltipState?.color}
          id={
            zingchartData?.find((item) => item?.encodeId === tooltipData)
              ?.encodeId
          }
          image={
            zingchartData?.find((item) => item?.encodeId === tooltipData)
              ?.thumbnail
          }
          title={
            zingchartData?.find((item) => item?.encodeId === tooltipData)?.title
          }
          artists={
            zingchartData?.find((item) => item?.encodeId === tooltipData)
              ?.artistsNames
          }
          choicePersen={
            Math.round(
              (zingchartData?.find((item) => item?.encodeId === tooltipData)
                ?.score *
                100) /
                +rankchartData?.totalScore
            ) + "%"
          }
        ></CardMedia>
      </div>
    </div>
  );
};

export default memo(ChartRank);
