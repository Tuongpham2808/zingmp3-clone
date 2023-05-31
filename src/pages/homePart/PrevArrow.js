import React from "react";
import { SlArrowLeft } from "react-icons/sl";

const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="btnPrev absolute top-1/2 left-0 -translate-y-1/2 translate-x-1/2 z-[4]"
      onClick={onClick}
    >
      <SlArrowLeft className="w-[31px] h-[31px] textPrimary -translate-x-[4px]"></SlArrowLeft>
    </button>
  );
};

export default PrevArrow;
