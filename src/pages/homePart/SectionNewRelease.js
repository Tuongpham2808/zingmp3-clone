import React, { useEffect, useState } from "react";
import { CardMedia } from "../../components";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

const SectionNewRelease = ({ genre = "all", homeData = [] }) => {
  const [newReleaseData, setNewReleaseData] = useState([]);
  const { screen } = useSelector((state) => state.screen);
  const [numberItem, setNumberItem] = useState({
    number: 3,
    gridCol: "grid-cols-3",
  });
  useEffect(() => {
    if (screen === "xl") {
      setNumberItem({
        number: 3,
        gridCol: "grid-cols-3",
      });
    }
    if (screen === "md") {
      setNumberItem({
        number: 2,
        gridCol: "grid-cols-2",
      });
    }
    if (screen === "sm") {
      setNumberItem({
        number: 1,
        gridCol: "grid-cols-1",
      });
    }
  }, [screen]);

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
    let dataRelease = dataArr.slice(0, numberItem.number);
    setNewReleaseData(dataRelease);
  }, [genre, homeData, numberItem.number]);

  return (
    <div className={`grid gap-x-7 ${numberItem.gridCol}`}>
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
  );
};

export default SectionNewRelease;
