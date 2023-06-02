import React from "react";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

const HeadSection = ({
  children,
  all = false,
  styleAll = "normal",
  title = "Mới Phát Hành",
  link = "/",
}) => {
  let style = "";
  switch (styleAll) {
    case "low":
      style = " xl:absolute xl:top-[50px] xl:right-0";
      break;
    case "normal":
      style = "";
      break;
    default:
      style = "";
      break;
  }
  return (
    <>
      <div className="relative flex items-baseline justify-between mb-5 textPrimary">
        <h3 className="flex-1 text-xl font-bold capitalize">{title}</h3>
        {all && (
          <Link
            to={link}
            className={`flex items-center gap-[6px] textSecondary${style}`}
          >
            <p className="text-xs font-semibold uppercase">Tất cả</p>
            <SlArrowRight className="w-4 h-4"></SlArrowRight>
          </Link>
        )}
      </div>
      {children}
    </>
  );
};

export default HeadSection;
