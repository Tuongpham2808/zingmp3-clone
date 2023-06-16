import React from "react";
import ImageMedia from "../../components/ImageMedia";
import { formatDate } from "../../utils/fnTime";
import { formatLiked } from "../../utils/fnNumber";
import BtnMore from "../../components/BtnMore";
import { IoPause, IoPlay } from "react-icons/io5";
import CoverIcon from "../../components/CoverIcon";
import { HiOutlineHeart } from "react-icons/hi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from "react-redux";

const SectionInfoPlaylist = ({
  dataPlaylist = {},
  onClick = () => {},
  idRandom = "",
}) => {
  const { isPlaying, atAlbum } = useSelector((state) => state.music);

  return (
    <div className="sticky w-1/4 left-0 top-[120px] hidden xl:flex flex-col items-center gap-y-3 pb-[30px]">
      <div className="shadow-[0_5px_8px_0_rgba(0,0,0,0.2)] rounded-lg overflow-hidden">
        <ImageMedia
          classImage="w-full rounded-lg"
          image={dataPlaylist?.thumbnailM}
          tyle="large"
          onClick={onClick}
          idRandom={idRandom}
        ></ImageMedia>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-2">
          <h3 className="textPrimary text-xl font-bold capitalize limit2LineText leading-6 text-center">
            {dataPlaylist?.title}
          </h3>
          <div className="flex items-baseline gap-1 text-xs leading-6 font-medium textSecondary2">
            <p>Cập nhật:</p>
            <p>
              {dataPlaylist?.releaseDate ||
                formatDate(dataPlaylist?.contentLastUpdate, "/")}
            </p>
          </div>
          <div className="textSecondary text-xs leading-6 font-medium limit2LineText text-center">
            {dataPlaylist?.artistsNames}
          </div>
          <div className="text-xs font-medium leading-5 textSecondary2">
            {formatLiked(dataPlaylist?.like)}
          </div>
        </div>
        <div className="mb-4">
          <BtnMore
            className="flex items-center gap-x-[5px] bg-[var(--bg-primary-hover)] !outline-0 textPrimary"
            onClick={onClick}
          >
            <span>
              {atAlbum && isPlaying ? (
                <IoPause className="w-5 h-5"></IoPause>
              ) : (
                <IoPlay className="w-5 h-5"></IoPlay>
              )}
            </span>
            <span className="uppercase text-sm font-normal">
              {atAlbum && isPlaying ? "Tạm dừng" : "Phát ngẫu nhiên"}
            </span>
          </BtnMore>
        </div>
        <div className="flex gap-x-[10px] items-center">
          <CoverIcon
            placeholder="Thêm vào thư viện"
            className="bg-[var(--bg-transparent1)]"
          >
            <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
          </CoverIcon>
          <CoverIcon placeholder="Khác" className="bg-[var(--bg-transparent1)]">
            <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
          </CoverIcon>
        </div>
      </div>
    </div>
  );
};

export default SectionInfoPlaylist;
