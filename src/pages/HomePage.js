import React, { useEffect, useState } from "react";
import SlickSlider from "./homePart/SlickSlider";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardMedia } from "../components";
import { v4 } from "uuid";
import HeadSection from "../components/HeadSection";

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
  const { homeData } = useSelector((state) => state.home);
  const [genre, setGenre] = useState("all");
  const [newReleaseData, setNewReleaseData] = useState([]);
  useEffect(() => {
    const newRelease = homeData.find(
      (item) => item.sectionType === "new-release"
    )?.items;
    let dataArr = [];
    let arr = [];
    if (newRelease) {
      for (let index = 1; index <= newRelease[genre].length; index++) {
        arr.push(newRelease[genre][index]);
        if (index % 4 === 0) {
          dataArr.push(arr);
          arr = [];
        }
      }
    }
    let dataRelease = dataArr.slice(0, 3);
    setNewReleaseData(dataRelease);
  }, [genre, homeData]);

  return (
    <div className="w-full h-full">
      <SlickSlider></SlickSlider>
      <div className="w-full mt-12 section textPrimary">
        <HeadSection all styleAll="low">
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
        <div className="grid grid-cols-3 gap-x-7">
          {newReleaseData.length > 0 &&
            newReleaseData.map((data) => (
              <div key={v4()} className="flex flex-col items-start">
                {data.map((item) => (
                  <CardMedia
                    key={item.encodeId}
                    title={item.title}
                    image={item.thumbnailM}
                    artists={item.artistsNames}
                    time={item.releaseDate}
                  ></CardMedia>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
