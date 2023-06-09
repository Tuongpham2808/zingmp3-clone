import React from "react";
import { Link } from "react-router-dom";

const BtnMore = ({
  link = "",
  title = "Xem thêm",
  className = "",
  onClick = () => {},
}) => {
  if (link) {
    return (
      <Link to={link} className={className}>
        <button className="md:px-6 mx-auto py-2 px-6 md:text-sm text-xs font-normal text1Line rounded-full outline outline-1 outline-[var(--text-secondary)] mt-2">
          {title}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`md:px-6 mx-auto py-2 px-6 md:text-sm text-xs font-normal text1Line rounded-full outline outline-1 outline-[var(--text-secondary)] mt-2 ${className}`}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
};

export default BtnMore;
