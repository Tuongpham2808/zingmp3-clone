import React, { useEffect, useState } from "react";
import ChartRank from "../components/ChartRank";
import LayoutSection from "../components/LayoutSection";
import { useDispatch, useSelector } from "react-redux";
import ZingchartPlayHead from "../components/ZingchartPlayHead";
import CardMediaRank from "../components/CardMediaRank";
import { handleGetZingchart } from "../store/zingchartSlice";
import { formatDuration } from "../utils/fnTime";
import BtnMore from "../components/BtnMore";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const ChartPage = () => {
  const { zingchartData, rankchartData, promotes, weekChartData } = useSelector(
    (state) => state.zingchart
  );
  const [promote, setPromote] = useState({});
  const [number, setNumber] = useState(10);
  const [listWeekRender, setListWeekRender] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetZingchart());
  }, [dispatch]);
  useEffect(() => {
    if (promotes.length > 0) {
      let result = promotes?.[Math.floor(Math.random() * promotes?.length)];
      setPromote(result);
    }
  }, [promotes]);

  useEffect(() => {
    let listWeekGlobal = [
      { title: "Việt Nam", data: weekChartData?.vn?.items },
      { title: "US-UK", data: weekChartData?.us?.items },
      { title: "K-Pop", data: weekChartData?.korea?.items },
    ];
    setListWeekRender(listWeekGlobal);
  }, [weekChartData]);

  console.log(listWeekRender);

  return (
    <div>
      <LayoutSection>
        <ZingchartPlayHead
          tyle="large"
          zingchartData={zingchartData}
        ></ZingchartPlayHead>
        <ChartRank
          zingchartData={zingchartData}
          rankchartData={rankchartData}
        ></ChartRank>
        <div className="flex flex-col pb-[30px]">
          {/* promote song */}
          <div className="promote">
            <CardMediaRank
              image={promote?.thumbnail}
              title={promote?.title}
              titleAlbum={promote?.album?.title}
              linkAlbum={promote?.album?.link}
              artists={promote?.artistsNames}
              durations={formatDuration(promote?.duration)}
              id={promote?.encodeId}
            ></CardMediaRank>
          </div>
          {/* list song top vn */}
          <div className="listRank mb-5">
            {zingchartData
              ?.filter((i, index) => index < number)
              ?.map((item, index) => (
                <CardMediaRank
                  key={v4()}
                  image={item?.thumbnail}
                  title={item?.title}
                  titleAlbum={item?.album?.title}
                  linkAlbum={item?.album?.link}
                  artists={item?.artistsNames}
                  durations={formatDuration(item?.duration)}
                  id={item?.encodeId}
                  rankNumber={index + 1}
                  rank
                  rakingStatus={item?.rakingStatus}
                ></CardMediaRank>
              ))}
          </div>
          {/* button more */}
          {number === 10 && (
            <div className="w-full text-center">
              <BtnMore
                className="mx-auto"
                onClick={() => setNumber(100)}
                title="Xem top 100"
              ></BtnMore>
            </div>
          )}
        </div>
        {/* week rank chart */}
        <div className="w-full h-full">
          <div className="w-full h-full relative">
            <div className="textPrimary pt-10 sticky inset-0 z-10">
              <h2 className="text-[40px] font-extrabold mb-5">
                Bảng xếp hạng tuần
              </h2>
              <div className="w-full grid grid-cols-3 gap-7 mb-[30px]">
                {listWeekRender &&
                  listWeekRender?.map((item) => (
                    <div className="py-5 px-[10px] rounded-2xl bgTrans4">
                      <div className="pt-0 pr-0 pb-[10px] pl-10">
                        <ZingchartPlayHead
                          title={item?.title}
                          tyle="normal"
                        ></ZingchartPlayHead>
                      </div>
                      <div className="w-full mb-4">
                        {item?.data?.length > 0 &&
                          item?.data
                            ?.filter((n, index) => index < 5)
                            ?.map((i, index) => (
                              <CardMediaRank
                                key={v4()}
                                image={i?.thumbnail}
                                title={i?.title}
                                titleAlbum={i?.album?.title}
                                linkAlbum={i?.album?.link}
                                artists={i?.artistsNames}
                                durations={formatDuration(i?.duration)}
                                id={i?.encodeId}
                                rankNumber={index + 1}
                                rank
                                size="small"
                                rakingStatus={i?.rakingStatus}
                              ></CardMediaRank>
                            ))}
                      </div>
                      <div className="w-full text-center">
                        <BtnMore
                          className="mx-auto"
                          onClick={() =>
                            toast.error("Chức năng chưa được phát triển")
                          }
                          title="Xem tất cả"
                        ></BtnMore>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-[140%] h-[130%] bgFiter absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      </LayoutSection>
    </div>
  );
};

export default ChartPage;
