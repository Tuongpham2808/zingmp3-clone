import React from "react";
import { IoPlay } from "../../utils/iconsOther";
import { setListSongs } from "../../store/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const SidebarNewList = () => {
  const { newReleaseData } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  return (
    <div className="px-8 font-medium text-center textPrimary">
      <h3 className="text-sm mt-[6px] mb-5">
        Khám phá thêm các bài hát mới của Zing MP3
      </h3>
      <button
        className="text-sm py-[7px] px-[26px] flex items-center justify-center bgPrimary transAll mx-auto rounded-full gap-[10px]"
        onClick={() => dispatch(setListSongs(newReleaseData?.vPop))}
      >
        <span>
          <IoPlay></IoPlay>
        </span>
        <p>Phát nhạc mới phát hành</p>
      </button>
    </div>
  );
};

export default SidebarNewList;
