import React, { useEffect, useState } from "react";
import { CardMedia } from "../../components";
import { v4 } from "uuid";

const SectionNewRelease = ({ genre = "all", homeData = [] }) => {
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
  );
};

export default SectionNewRelease;
