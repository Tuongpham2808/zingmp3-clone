import React from "react";

const LayoutSection = ({ children, className = "" }) => {
  return (
    <div className={`w-full mt-4 md:mt-12 textPrimary ${className}`}>
      {children}
    </div>
  );
};

export default LayoutSection;
