import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";
import { v4 } from "uuid";

const MyTooltip = ({
  placeholder = "my tooltip",
  offset = 10,
  place = "top",
  children,
  className = "",
}) => {
  const stringId = "my-tooltip" + v4();

  return (
    <>
      <div
        className={className}
        data-tooltip-id={stringId}
        data-tooltip-content={placeholder}
        data-tooltip-offset={offset}
        data-tooltip-place={place}
      >
        {children}
      </div>
      <Tooltip id={stringId} className="!text-xs" />
    </>
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
