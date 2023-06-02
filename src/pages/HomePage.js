import React, { useEffect, useState } from "react";
import SlickSlider from "./homePart/SlickSlider";
import { useDispatch, useSelector } from "react-redux";
import HeadSection from "../components/HeadSection";
import { handleFetchHome } from "../store/homeSlice";
import SectionNewRelease from "./homePart/SectionNewRelease";
import LayoutSection from "../components/LayoutSection";
import SectionListAlbums from "./homePart/SectionListAlbums";
import SectionReleaseSlider from "./homePart/SectionReleaseSlider";

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
  const { homeData } = useSelector((state) => state.home);
  const [genre, setGenre] = useState("all");
  console.log(homeData);

  return (
    <div className="w-full h-full">
      <SlickSlider></SlickSlider>
      <LayoutSection>
        <HeadSection all styleAll="low" title="Mới phát hành">
          <div className="flex items-center gap-[15px] mb-4">
            {btnData.map((item) => (
              <button
                key={item.genre}
                className={`px-6 py-1 text-sm font-normal uppercase rounded-full ${
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
          homeData={homeData}
        ></SectionNewRelease>
      </LayoutSection>
      {/* chill */}
      <LayoutSection>
        <HeadSection title="Chill" all></HeadSection>
        <SectionListAlbums
          homeData={homeData}
          sectionId="hEditorTheme"
        ></SectionListAlbums>
      </LayoutSection>
      {/* Năng lượng tích cực */}
      <LayoutSection>
        <HeadSection title="Năng lượng tích cực"></HeadSection>
        <SectionListAlbums
          homeData={homeData}
          sectionId="hEditorTheme2"
        ></SectionListAlbums>
      </LayoutSection>
      {/* Nghệ sĩ thịnh hành */}
      <LayoutSection>
        <HeadSection title="Nghệ sĩ thành hành"></HeadSection>
        <SectionListAlbums
          homeData={homeData}
          sectionId="hArtistTheme"
        ></SectionListAlbums>
      </LayoutSection>
      {/* BXH nhạc mới */}
      <LayoutSection>
        <HeadSection title="BXH Nhạc Mới">
          <SectionReleaseSlider homeData={homeData}></SectionReleaseSlider>
        </HeadSection>
      </LayoutSection>
    </div>
  );
};

export default HomePage;
