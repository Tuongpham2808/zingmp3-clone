import React, { useEffect, useState } from "react";
import SlickSlider from "./homePart/SlickSlider";
import { useDispatch, useSelector } from "react-redux";
import HeadSection from "../components/HeadSection";
import { handleFetchHome } from "../store/homeSlice";
import SectionNewRelease from "./homePart/SectionNewRelease";
import LayoutSection from "../components/LayoutSection";
import SectionListAlbums from "./homePart/SectionListAlbums";
import SectionReleaseSlider from "./homePart/SectionReleaseSlider";
import SectionWeekChart from "./homePart/SectionWeekChart";
import SectionPartner from "./homePart/SectionPartner";
import SectionListAlbumsSlider from "./homePart/SectionListAlbumsSlider";
import ZingchartIcon from "../utils/iconsOther/ZingchartIcon";
import { setCurSongId } from "../store/musicSlice";
import { setIsPlaying } from "../store/musicSlice";
import { setRelatedsong } from "../store/musicSlice";
import { setListSongs } from "../store/musicSlice";
import * as apis from "../apis/music";
import { CardMedia } from "../components";
import { v4 } from "uuid";

const btnData = [
  {
    title: "Tất cả",
    genre: "all",
  },
  {
    title: "Việt nam",
    genre: "vPop",
  },
  {
    title: "Quốc tế",
    genre: "others",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleFetchHome());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    banneData,
    newReleaseData,
    chillData,
    energyData,
    trendArtistData,
    rankReleaseData,
    weekChartData,
    top100Data,
    albumHotData,
  } = useSelector((state) => state.home);
  const [genre, setGenre] = useState("all");
  let id = rankReleaseData[0]?.encodeId;
  //play first song zing chart
  async function fetchDataPlay() {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(id);
    console.log(res2);
    if (res2.data.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(setListSongs(rankReleaseData));
  }

  return (
    <div className="w-full h-full">
      <SlickSlider data={banneData}></SlickSlider>
      <LayoutSection>
        <HeadSection all styleAll="low" title="Mới phát hành">
          <div className="flex items-center gap-x-[6px] md:gap-[15px] mb-4">
            {btnData.map((item) => (
              <button
                key={item.genre}
                className={`md:px-6 py-1 px-3 md:text-sm text-xs font-normal text1Line uppercase rounded-full ${
                  genre === item.genre
                    ? "bgPrimary"
                    : "outline outline-1 outline-[var(--text-secondary)]"
                }`}
                onClick={() => setGenre(item.genre)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </HeadSection>
        <SectionNewRelease
          genre={genre}
          data={newReleaseData}
        ></SectionNewRelease>
      </LayoutSection>
      {/* chill */}
      <LayoutSection>
        <HeadSection title="Chill" all></HeadSection>
        <SectionListAlbums data={chillData}></SectionListAlbums>
      </LayoutSection>
      {/* Năng lượng tích cực */}
      <LayoutSection>
        <HeadSection title="Năng lượng tích cực"></HeadSection>
        <SectionListAlbums data={energyData}></SectionListAlbums>
      </LayoutSection>
      {/* Nghệ sĩ thịnh hành */}
      <LayoutSection>
        <HeadSection title="Nghệ sĩ thịnh hành"></HeadSection>
        <SectionListAlbums data={trendArtistData}></SectionListAlbums>
      </LayoutSection>
      {/* BXH nhạc mới */}
      <LayoutSection>
        <HeadSection title="BXH Nhạc Mới">
          <SectionReleaseSlider data={rankReleaseData}></SectionReleaseSlider>
        </HeadSection>
      </LayoutSection>
      {/* #Zing chart */}
      <LayoutSection>
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
              {rankReleaseData?.slice(0, 3).map((item, index) => (
                <CardMedia
                  key={v4()}
                  zingchart={true}
                  artists={item?.artistsNames}
                  title="title"
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
      </LayoutSection>
      {/* Week chart */}
      <LayoutSection>
        <SectionWeekChart data={weekChartData}></SectionWeekChart>
      </LayoutSection>
      {/* Top 100 */}
      <LayoutSection>
        <HeadSection title="Top 100"></HeadSection>
        <SectionListAlbums data={top100Data} styles="more"></SectionListAlbums>
      </LayoutSection>
      {/* Album hot */}
      <LayoutSection>
        <HeadSection title="Album hot"></HeadSection>
        <SectionListAlbumsSlider
          data={albumHotData}
          styles="more"
        ></SectionListAlbumsSlider>
      </LayoutSection>
      {/* patner */}
      <LayoutSection>
        <h3 className="text-center uppercase mb-6 w-full text-sm font-bold tracking-[1.71px] textSecondary">
          Đối tác âm nhạc
        </h3>
        <SectionPartner></SectionPartner>
      </LayoutSection>
    </div>
  );
};

export default HomePage;
