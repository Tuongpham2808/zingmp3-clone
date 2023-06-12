import React from "react";
import { useSelector } from "react-redux";
import CardMediaSearch from "../../components/CardMediaSearch";
import { v4 } from "uuid";
import { editLinkAlbum, johnNameArtist } from "../../utils/fnSong";

const SectionTop = () => {
  const { dataSearch, dataSearchSuggest } = useSelector(
    (state) => state.search
  );
  return (
    <div className="w-full grid grid-cols-3 gap-x-7">
      {dataSearchSuggest?.length > 0 &&
        dataSearchSuggest
          ?.filter((i, index) => index < 3)
          ?.map((item) => (
            <CardMediaSearch
              key={v4()}
              title={item?.title || item?.name}
              image={item?.thumb || item?.avatar}
              type={item?.type}
              subTitle={
                item?.type === 4
                  ? item?.followers
                  : johnNameArtist(item?.artists)
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
