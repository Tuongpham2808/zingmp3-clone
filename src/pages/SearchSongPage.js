import React from "react";
import { useSelector } from "react-redux";
import LayoutSection from "../components/LayoutSection";
import HeadSection from "../components/HeadSection";
import CardMediaRank from "../components/CardMediaRank";
import { v4 } from "uuid";
import { formatDuration } from "../utils/fnTime";

const SearchSongPage = () => {
  const { dataSearch } = useSelector((state) => state.search);
  return (
    <div className="w-full">
      <LayoutSection className="md:mt-7">
        <HeadSection title="Bài hát"></HeadSection>
        <div className="w-full">
          {dataSearch?.songs?.length > 0 &&
            dataSearch?.songs?.map((item) => (
              <CardMediaRank
                key={v4()}
                image={item?.thumbnail}
                title={item?.title}
                titleAlbum={item?.album?.title}
                artists={item?.artistsNames}
                durations={formatDuration(item?.duration)}
                id={item?.encodeId}
                listSongsRight={dataSearch?.songs}
                disPlayRank={false}
              ></CardMediaRank>
            ))}
        </div>
      </LayoutSection>
    </div>
  );
};

export default SearchSongPage;
