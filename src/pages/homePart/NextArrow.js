import React from "react";
import { SlArrowRight } from "react-icons/sl";

const nextArrow = ({ onClick }) => {
  return (
    <button
      className="btnNext absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 z-[4]"
      onClick={onClick}
    >
      <SlArrowRight className="w-[31px] h-[31px] textPrimary translate-x-[4px]"></SlArrowRight>
    </button>
  );
};

export default nextArrow;
