import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal, HiOutlineHeart } from "../../utils/iconsOther";
import ImageMedia from "../../components/ImageMedia";
import * as apis from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import MyTooltip from "../../components/MyTooltip";
import { setDataCurSong } from "../../store/musicSlice";

const ControllLeft = () => {
  //lấy data audio ra
  const { curSongId, dataCurSong } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  //load data song info
  useEffect(() => {
    const fetchDetailSong = async () => {
      const res = await apis.apiGetSongDetail(curSongId);
      if (res.data.err === 0) {
        dispatch(setDataCurSong(res?.data?.data));
      }
    };
    fetchDetailSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId]);

  return (
    <div className="flex items-center gap-[10px] max-w-[30%] flex-none h-full">
      <ImageMedia
        image={dataCurSong?.thumbnailM}
        tyle="none"
        classImage="w-16 h-16"
      ></ImageMedia>
      <div className="xs:flex hidden flex-col items-start justify-center max-w-[200px] titlePlayControll">
        <Link to="" className="text-sm font-medium textPrimary">
          <span className="titlePlayControll">
            <p className="textPlay">
              {Array(2).fill(dataCurSong?.title).join(". ")}
            </p>
          </span>
        </Link>
        <span className="block text-xs font-semibold textSecondary text1Line">
          {dataCurSong?.artistsNames}
        </span>
      </div>
      <div className="flex items-center">
        <span className="w-8 h-8 p-[3px] mx-[2px] hidden xs:flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)] cursor-pointer">
          <MyTooltip placeholder="Thêm vào thư viện" offset={20}>
            <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
          </MyTooltip>
        </span>
        <span className="w-8 h-8 p-[3px] mx-[2px] items-center hidden lg:flex justify-center textPrimary rounded-full hover:bg-[var(--bg-active)] cursor-pointer">
          <MyTooltip placeholder="Xem thêm" offset={20}>
            <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
          </MyTooltip>
        </span>
      </div>
    </div>
  );
};

export default ControllLeft;
