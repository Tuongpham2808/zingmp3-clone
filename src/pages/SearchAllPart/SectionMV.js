import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import { useSelector } from "react-redux";
import { formatDuration } from "../../utils/fnTime";
import useWindowSize from "../../hooks/useWindowSize";
import CardVideo from "../../components/CardVideo";
import { v4 } from "uuid";

const SectionMV = () => {
  const { dataSearch } = useSelector((state) => state.search);
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
      setNumberItem(2);
    }
  }, [size]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 md:gap-x-4 lg:gap-x-7">
      {dataSearch?.videos?.length > 0 &&
        dataSearch?.videos
          ?.filter((i, index) => index < numberItem)
          ?.map((item) => <CardVideo key={v4()} data={item}></CardVideo>)}
    </div>
  );
};

export default SectionMV;
