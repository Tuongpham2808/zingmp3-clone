import React from "react";
import { useSelector } from "react-redux";
import CardMediaRank from "../../components/CardMediaRank";
import { formatDuration } from "../../utils/fnTime";
import { v4 } from "uuid";

const SectionSongs = () => {
  const { dataSearch, dataSearchSuggest } = useSelector(
    (state) => state.search
  );
  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-3 gap-x-7">
      {dataSearch?.songs?.length > 0 &&
        dataSearch?.songs
          ?.filter((n, index) => index < 6)
          ?.map((i) => (
            <div
              key={v4()}
              className="w-full border-b-[1px] border-[var(--bg-transparent4)]"
            >
              <CardMediaRank
                image={i?.thumbnail}
                title={i?.title}
                titleAlbum={i?.album?.title}
                linkAlbum={i?.album?.link}
                artists={i?.artistsNames}
                durations={formatDuration(i?.duration)}
                id={i?.encodeId}
                size="small"
                disPlayRank={false}
                streamingStatus={i?.streamingStatus}
                listSongsRight={dataSearch?.songs}
              ></CardMediaRank>
            </div>
          ))}
    </div>
  );
};

export default SectionSongs;
