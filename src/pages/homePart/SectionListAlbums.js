import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import { useSelector } from "react-redux";

const SectionListAlbums = ({ data = [], styles = "basic" }) => {
  const { screen } = useSelector((state) => state.screen);
  const [List, setList] = useState([]);
  const [numberItem, setNumberItem] = useState(5);
  useEffect(() => {
    if (screen === "2xl") {
      setNumberItem(5);
    }
    if (screen === "xl") {
      setNumberItem(5);
    }
    if (screen === "md") {
      setNumberItem(4);
    }
    if (screen === "sm") {
      setNumberItem(2);
    }
  }, [screen]);

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
            ></ImageMedia>
            {styles === "basic" && (
              <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
                {item?.sortDescription}
              </span>
            )}
            {styles === "more" && (
              <div className="w-full flex flex-col gap-y-1">
                <h3 className="text-sm font-bold textPrimary text1Line">
                  {item?.title}
                </h3>
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
