import React, { useEffect, useState } from "react";
import SlickSlider from "./homePart/SlickSlider";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardMedia } from "../components";
import { v4 } from "uuid";

const HomePage = () => {
  const { homeData } = useSelector((state) => state.home);
  const [newReleaseData, setNewReleaseData] = useState([]);
  useEffect(() => {
    const newRelease = homeData.find(
      (item) => item.sectionType === "new-release"
    )?.items;
    let dataArr = [];
    let arr = [];
    for (let index = 1; index <= newRelease?.all.length; index++) {
      arr.push(newRelease?.all[index]);
      if (index % 4 === 0) {
        dataArr.push(arr);
        arr = [];
      }
    }
    let dataRelease = dataArr.slice(0, 3);
    setNewReleaseData(dataRelease);
  }, [homeData]);

  return (
    <div className="w-full h-full">
      <SlickSlider></SlickSlider>
      <div className="section mt-12 w-full textPrimary relative">
        <div className="flex justify-between items-center mb-5">
          <h3 className="flex-1 text-xl font-bold capitalize">Mới Phát Hành</h3>
          <Link
            to="/"
            className="flex items-start gap-[6px] textSecondary absolute top-[50px] right-0"
          >
            <p className="uppercase text-xs font-semibold">Tất cả</p>
            <SlArrowRight className="w-4 h-4"></SlArrowRight>
          </Link>
        </div>
        <div className="flex items-center gap-[15px] mb-4">
          <button className="uppercase text-sm font-normal py-1 px-6 rounded-full bgPrimary">
            Tất cả
          </button>
          <button className="uppercase text-sm font-normal py-1 px-6 rounded-full outline outline-1 outline-[var(--text-secondary)]">
            Việt nam
          </button>
          <button className="uppercase text-sm font-normal py-1 px-6 rounded-full outline outline-1 outline-[var(--text-secondary)]">
            Quốc tế
          </button>
        </div>
        <div className="grid grid-cols-3 gap-x-7">
          {newReleaseData.length > 0 &&
            newReleaseData.map((data) => (
              <div key={v4()} className="flex flex-col items-start">
                {data.map((item) => (
                  <CardMedia
                    key={item.encodeId}
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
