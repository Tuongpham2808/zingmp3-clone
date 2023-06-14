import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardMediaSearch from "../../components/CardMediaSearch";
import { v4 } from "uuid";
import { editLinkAlbum, johnNameArtist } from "../../utils/fnSong";
import useWindowSize from "../../hooks/useWindowSize";

const SectionTop = () => {
  const { dataSearch, dataSearchSuggest: data } = useSelector(
    (state) => state.search
  );
  const [List, setList] = useState([]);
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
    setList(data?.slice(0, numberItem));
  }, [data, numberItem]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 md:gap-x-4 lg:gap-x-7">
      {List?.length > 0 &&
        List?.map((item) => (
          <CardMediaSearch
            key={v4()}
            title={item?.title || item?.name}
            image={item?.thumb || item?.avatar}
            type={item?.type}
            subTitle={
              item?.type === 4 ? item?.followers : johnNameArtist(item?.artists)
            }
            link={editLinkAlbum(
              item?.link,
              item?.id,
              item?.radioPid,
              item?.type
            )}
          ></CardMediaSearch>
        ))}
    </div>
  );
};

export default SectionTop;
