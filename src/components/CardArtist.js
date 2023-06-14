import React, { memo } from "react";
import { IoShuffleOutline } from "react-icons/io5";
import { v4 } from "uuid";
import { formatLiked } from "../utils/fnNumber";
import BtnMore from "./BtnMore";
import { MdGroupAdd } from "react-icons/md";

const CardArtist = ({ data = {} }) => {
  return (
    <div key={v4()} className="w-full">
      <div className="rounded-full w-full overflow-hidden relative group cursor-pointer mb-4">
        <span className="w-full">
          <img
            src={data?.thumbnailM}
            alt=""
            className="rounded-full w-full object-cover transition1 group-hover:scale-110"
          />
        </span>
        <div className="absolute inset-0 group-hover:bg-[var(--bg-transparent2)] flex items-center justify-center">
          <div className="w-[45px] h-[45px] hidden items-center justify-center textPrimary group-hover:flex outline outline-1 rounded-full">
            <IoShuffleOutline className="w-7 h-7"></IoShuffleOutline>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mb-4">
        <h3 className="textPrimary text-sm font-medium capitalize limit2LineText leading-6 text-center">
          {data?.name}
        </h3>
        <p className="text-xs font-medium leading-5 text-center textSecondary2">
          {formatLiked(data?.totalFollow, "quan tâm")}
        </p>
      </div>
      <div className="w-full flex-none ">
        <BtnMore className="flex items-center gap-x-[5px] bg-[var(--bg-primary-hover)] py-[6px] px-[19px] !outline-0 textPrimary">
          <span className="w-4">
            <MdGroupAdd className="w-4 h-4"></MdGroupAdd>
          </span>
          <p className="uppercase text-xs font-normal">quan tâm</p>
        </BtnMore>
      </div>
    </div>
  );
};

export default memo(CardArtist);
