import React, { useEffect, useState } from "react";
import { CardMedia } from "../../components";
import { v4 } from "uuid";
import useWindowSize from "../../hooks/useWindowSize";

const SectionNewRelease = ({ genre = "all", data = {} }) => {
  const [newReleaseData, setNewReleaseData] = useState([]);
  const [numberItem, setNumberItem] = useState(3);
  let size = useWindowSize();
  useEffect(() => {
    if (size === "2xl") {
      setNumberItem(3);
    }
    if (size === "xl") {
      setNumberItem(3);
    }
    if (size === "md") {
      setNumberItem(2);
    }
    if (size === "sm") {
      setNumberItem(1);
    }
  }, [size]);

  useEffect(() => {
    let dataArr = [];
    let arr = [];
    if (data) {
      for (let index = 1; index <= data[genre]?.length; index++) {
        arr.push(data[genre][index - 1]);
        if (index % 4 === 0) {
          dataArr.push(arr);
          arr = [];
        }
      }
    }
    setNewReleaseData(dataArr?.slice(0, numberItem) || []);
  }, [genre, data, numberItem]);

  return (
    <div className="grid gap-x-7 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 section-newRelease">
      {newReleaseData?.length > 0 &&
        newReleaseData?.map((data) => (
          <div key={v4()} className="flex flex-col items-start">
            {data.map((item) => (
              <CardMedia
                key={item.encodeId}
                title={item.title}
                image={item.thumbnail}
                artists={item.artistsNames}
                time={item.releaseDate}
                id={item.encodeId}
              ></CardMedia>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SectionNewRelease;
