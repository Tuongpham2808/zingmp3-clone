import React from "react";
import { SlArrowRight } from "react-icons/sl";

const nextArrow = ({ onClick, hover = false, tyle = "large" }) => {
  let classstyle = {
    classbtn: "w-[55px] h-[55px] bg-[var(--bg-transparent1)]",
    classArrow: "w-[31px] h-[31px] textPrimary translate-x-[4px]",
  };
  if (tyle === "medium") {
    classstyle = {
      classbtn: "w-[38px] h-[38px] bg-[var(--text-primary)]",
      classArrow: "w-5 h-5 textSecondary translate-x-[2px]",
    };
  }

  return (
    <button
      className={`items-center justify-center rounded-full btnNext absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 z-[1] ${
        hover ? "hidden" : "flex"
      } ${classstyle.classbtn}`}
      onClick={onClick}
    >
      <SlArrowRight className={classstyle.classArrow}></SlArrowRight>
    </button>
  );
};

export default nextArrow;
