import React from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal, HiOutlineHeart } from "../../utils/iconsOther";
import { MyTooltip } from "../../components";

const ControllLeft = () => {
  return (
    <div className="flex items-center gap-[10px] max-w-[30%] flex-none h-full">
      <img
        src="https://images.unsplash.com/photo-1502174832274-bc176e52765a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        alt=""
        className="object-cover w-16 h-16 rounded shrink-0"
      />
      <div className="flex flex-col items-start justify-center max-w-[200px] titlePlayControll">
        <Link to="" className="text-sm font-medium textPrimary">
          <span className="titlePlayControll">
            <p className="textPlay">
              {Array(4).fill(`Kẻ Viết Ngôn Tình`).join(". ")}
            </p>
          </span>
        </Link>
        <span className="block text-xs">
          <Link to="" className="inline-block font-semibold textSecondary">
            Châu khải phong
          </Link>
          <p className="inline-block font-medium textSecondary">, </p>
          <Link to="" className="inline-block font-semibold textSecondary">
            ACV
          </Link>
        </span>
      </div>
      <div className="flex items-center">
        <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Thêm vào thư viện" offset={20}>
            <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
          </MyTooltip>
        </span>
        <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
          <MyTooltip placeholder="Xem thêm" offset={20}>
            <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
          </MyTooltip>
        </span>
      </div>
    </div>
  );
};

export default ControllLeft;
