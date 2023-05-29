import React from "react";
import PropTypes from "prop-types";

const MyTooltip = ({
  placeholder = "my tooltip",
  offset = 10,
  place = "top",
  children = "",
  className = "",
}) => {
  return (
    <div
      className={`my-tooltip ${className}`}
      data-tooltip-content={placeholder}
      data-tooltip-offset={offset}
      data-tooltip-place={place}
    >
      {children}
    </div>
  );
};

MyTooltip.propTypes = {
  placeholder: PropTypes.string,
  offset: PropTypes.oneOf([10, 20, 30, 40, 50]),
  place: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  content: PropTypes.any,
  className: PropTypes.string,
};

export default MyTooltip;
