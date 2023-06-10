import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import useWindowSize from "../../hooks/useWindowSize";
import { Link } from "react-router-dom";

const SectionListAlbums = ({ data = [], styles = "basic" }) => {
  const [List, setList] = useState([]);
  const [numberItem, setNumberItem] = useState(5);
  let size = useWindowSize();
  useEffect(() => {
    if (size === "2xl") {
      setNumberItem(5);
    }
    if (size === "xl") {
      setNumberItem(5);
    }
    if (size === "md") {
      setNumberItem(4);
    }
    if (size === "sm") {
      setNumberItem(2);
    }
  }, [size]);

  useEffect(() => {
    setList(data?.slice(0, numberItem));
  }, [data, numberItem]);

  return (
    <div className="grid gap-x-3 md:gap-x-4 xl:grid-cols-5 md:grid-cols-4 lg:gap-x-7 grid-cols-2">
      {List?.length > 0 &&
        List.map((item) => (
          <div key={item.encodeId} className="flex flex-col gap-y-3">
            <ImageMedia
              image={item?.thumbnailM}
              title={item?.title}
              link={item?.link}
            ></ImageMedia>
            {styles === "basic" && (
              <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
                {item?.sortDescription}
              </span>
            )}
            {styles === "more" && (
              <div className="w-full flex flex-col gap-y-1">
                <Link to={item?.link}>
                  <h3 className="text-sm font-bold textPrimary text1Line">
                    {item?.title}
                  </h3>
                </Link>
                <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
                  {item?.artists?.map((artist) => artist?.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default SectionListAlbums;
