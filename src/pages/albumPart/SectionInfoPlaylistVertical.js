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

const SectionInfoPlaylistVertical = ({
  dataPlaylist = {},
  onClick = () => {},
  idRandom = "",
  children,
}) => {
  const { isPlaying, atAlbum } = useSelector((state) => state.music);

  return (
    <div className="flex-col sm:flex sm:flex-row xl:hidden items-center gap-x-5 pb-[30px]">
      <div className="shadow-[0_5px_8px_0_rgba(0,0,0,0.2)] rounded-lg w-[300px] sm:w-[200px] mx-auto mb-5 sm:mx-0 sm:mb-0">
        <ImageMedia
          classImage="w-[300px] sm:w-[200px] rounded-lg"
          image={dataPlaylist?.thumbnailM}
          tyle="large"
          onClick={onClick}
          idRandom={idRandom}
        ></ImageMedia>
      </div>
      <div className="w-full flex flex-col items-center sm:items-start">
        <div className="flex flex-col items-center sm:items-start mb-2">
          <h3 className="textPrimary text-xl font-bold capitalize limit2LineText leading-6">
            {dataPlaylist?.title}
          </h3>
          <div className="flex items-baseline gap-1 text-xs leading-6 font-medium textSecondary2">
            <p>Cập nhật:</p>
            <p>
              {dataPlaylist?.releaseDate ||
                formatDate(dataPlaylist?.contentLastUpdate, "/")}
            </p>
          </div>
          <div className="textSecondary text-xs leading-6 font-medium limit2LineText">
            {dataPlaylist?.artistsNames}
          </div>
          <div className="text-xs font-medium leading-5 textSecondary2">
            {formatLiked(dataPlaylist?.like)}
          </div>
        </div>
        <div className="w-full">{children}</div>
        <div className="w-full flex items-center justify-center sm:justify-start gap-x-[10px] mt-4">
          <CoverIcon
            placeholder="Thêm vào thư viện"
            className="bg-[var(--bg-transparent1)] block sm:hidden"
          >
            <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
          </CoverIcon>
          <BtnMore
            className="!flex items-center !m-0 gap-x-[5px] bg-[var(--bg-primary-hover)] !outline-0 textPrimary"
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
          <div className="flex gap-x-[10px] items-center">
            <CoverIcon
              placeholder="Thêm vào thư viện"
              className="hidden sm:block bg-[var(--bg-transparent1)]"
            >
              <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
            </CoverIcon>
            <CoverIcon
              placeholder="Khác"
              className="bg-[var(--bg-transparent1)]"
            >
              <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
            </CoverIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionInfoPlaylistVertical;
