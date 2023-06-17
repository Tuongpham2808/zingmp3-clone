import React, { memo } from "react";
import ImageMedia from "./ImageMedia";
import { formatDate } from "../utils/fnTime";
import {
  setCurSongId,
  setIsPlaying,
  setListSongs,
  setRelatedsong,
} from "../store/musicSlice";
import { useDispatch } from "react-redux";
import { PromoteSongRandomId } from "../utils/fnSong";
import * as apis from "../apis";

const CardReleaseMedia = ({
  dataSong = {},
  dataList = [],
  isImage = true,
  children,
  ranking = 0,
}) => {
  let date = formatDate(dataSong?.releaseDate);
  const dispatch = useDispatch();
  // console.log(dataSong);
  //Thực hiện lấy ra list nhạc mới nhất thông qua id
  async function fetchDataRelated(id) {
    dispatch(setCurSongId(id));
    dispatch(setIsPlaying(true));
    const res2 = await apis.apiGetRelatedSong(PromoteSongRandomId());
    if (res2.data.err === 0) {
      dispatch(setRelatedsong(res2?.data?.data?.items));
    }
    dispatch(setListSongs(dataList));
  }
  const handleSelectSongDoubleClick = (id) => {
    if (id !== "") {
      fetchDataRelated(id);
    }
  };
  const handleSelectSongClick = (id) => {
    if (id !== "") {
      fetchDataRelated(id);
    }
  };

  return (
    <div
      className="px-[14px] w-full"
      onDoubleClick={() => handleSelectSongDoubleClick(dataSong?.encodeId)}
    >
      <div className="p-[15px] bgTrans1 rounded">
        {isImage && (
          <div className="flex overflow-hidden gap-x-[10px]">
            <ImageMedia
              image={dataSong?.thumbnailM}
              classImage="w-[120px] h-[120px]"
              tyle="large"
              id={dataSong?.encodeId}
              onClick={() => handleSelectSongClick(dataSong?.encodeId)}
            ></ImageMedia>
            <div className="flex flex-col justify-between w-full">
              <div className="w-full">
                <h3 className="text-sm font-medium limit2LineText">
                  {dataSong?.title}
                </h3>
                <p className="text-xs font-medium mt-[3px] textSecondary cursor-pointer text1Line">
                  {dataSong?.artistsNames}
                </p>
              </div>
              <div className="flex justify-start items-end">
                <span className="xs:text-[40px] text-6xl font-black text-transparent whitespace-nowrap leading-[1] strokeText">
                  {"#" + ranking}
                </span>
                <span className="ml-auto text-sm text-right whitespace-nowrap hidden xs:inline-block textSecondary font-medium">
                  {date}
                </span>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default memo(CardReleaseMedia);
