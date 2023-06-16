import React from "react";
import { Link } from "react-router-dom";

const CoverItemSearch = ({
  link = "",
  onClick = () => {},
  children,
  className = "",
}) => {
  if (link !== "") {
    return (
      <div
        className={`w-full itemSuggest py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  } else {
    return (
      <Link
        to={link}
        className={`w-full itemSuggest py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded ${className}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
};

export default CoverItemSearch;
