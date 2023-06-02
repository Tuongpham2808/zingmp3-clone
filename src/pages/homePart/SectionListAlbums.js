import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import { useSelector } from "react-redux";

const SectionListAlbums = ({ homeData = [], sectionId = "hEditorTheme" }) => {
  const { screen } = useSelector((state) => state.screen);
  const [data, setData] = useState([]);
  const [numberItem, setNumberItem] = useState({
    number: 5,
    gridCol: "grid-cols-5",
  });
  useEffect(() => {
    if (screen === "xl") {
      setNumberItem({
        number: 5,
        gridCol: "grid-cols-5",
      });
    }
    if (screen === "md") {
      setNumberItem({
        number: 4,
        gridCol: "grid-cols-4",
      });
    }
    if (screen === "sm") {
      setNumberItem({
        number: 2,
        gridCol: "grid-cols-2",
      });
    }
  }, [screen]);

  useEffect(() => {
    let result = homeData?.find((item) => item.sectionId === sectionId)?.items;
    setData(result?.slice(0, numberItem.number));
  }, [homeData, numberItem, sectionId]);
  // console.log(data);

  return (
    <div className={`grid gap-x-7 ${numberItem.gridCol}`}>
      {data?.length > 0 &&
        data.map((item) => (
          <div key={item.encodeId} className="flex flex-col gap-y-3">
            <ImageMedia
              image={item?.thumbnail}
              title={item?.title}
            ></ImageMedia>
            <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
              {item?.sortDescription}
            </span>
          </div>
        ))}
    </div>
  );
};

export default SectionListAlbums;
