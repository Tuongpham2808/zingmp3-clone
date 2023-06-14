import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import { useSelector } from "react-redux";
import { formatDuration } from "../../utils/fnTime";
import useWindowSize from "../../hooks/useWindowSize";

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
          ?.map((item) => (
            <div className="w-full textPrimary">
              <div className="w-full relative">
                <span className="absolute right-[5px] bottom-[5px] z-50 text-xs py-[3px] px-[5px] rounded bg-[rgba(0,0,0,0.7)]">
                  {formatDuration(item?.duration)}
                </span>
                <ImageMedia image={item?.thumbnailM} tyle="large"></ImageMedia>
              </div>
              <div className="w-full py-[10px] flex items-center gap-x-[10px]">
                <img
                  src={item?.artist?.thumbnail}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text1Line">
                    {item?.title}
                  </span>
                  <p className="text-xs textSecondary2 font-normal text1Line">
                    {item?.artistsNames}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SectionMV;
