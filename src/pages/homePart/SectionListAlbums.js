import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { MyTooltip } from "../../components";
import { HiOutlineHeart } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import ImageMedia from "../../components/ImageMedia";

const SectionListAlbums = ({ homeData = [], sectionId = "hEditorTheme" }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let result = homeData?.find((item) => item.sectionId === sectionId)?.items;
    setData(result?.slice(0, 5));
  }, [homeData, sectionId]);
  console.log(data);
  return (
    <div className="grid grid-cols-5 gap-x-7">
      {data?.length > 0 &&
        data.map((item) => (
          <div key={item.encodeId}>
            <ImageMedia thumbnail={item?.thumbnail}></ImageMedia>
          </div>
        ))}
    </div>
  );
};

export default SectionListAlbums;
