import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import { useSelector } from "react-redux";

const SectionListAlbums = ({
  homeData = [],
  sectionId = "hEditorTheme",
  styles = "basic",
}) => {
  const { screen } = useSelector((state) => state.screen);
  const [data, setData] = useState([]);
  const [numberItem, setNumberItem] = useState(5);
  useEffect(() => {
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
    let result = homeData?.find((item) => item.sectionId === sectionId)?.items;
    setData(result?.slice(0, numberItem));
  }, [homeData, numberItem, sectionId]);
  // console.log(data);

  return (
    <div className="grid gap-x-3 md:gap-x-7 xl:grid-cols-5 md:grid-cols-4 grid-cols-2">
      {data?.length > 0 &&
        data.map((item) => (
          <div key={item.encodeId} className="flex flex-col gap-y-3">
            <ImageMedia
              image={item?.thumbnail}
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
