import React, { memo } from "react";
import ImageMedia from "./ImageMedia";
import { formatDate } from "../utils/fnTime";

const CardReleaseMedia = ({
  data = {},
  isImage = true,
  children,
  ranking = 0,
}) => {
  let date = formatDate(data?.releaseDate);
  // console.log(date);
  return (
    <div className="px-[14px] w-full">
      <div className="p-[15px] bgTrans1 rounded">
        {isImage && (
          <div className="flex overflow-hidden gap-x-[10px]">
            <ImageMedia
              image={data?.thumbnailM}
              classImage="w-[120px] h-[120px]"
              tyle="large"
            ></ImageMedia>
            <div className="flex flex-col justify-between w-full">
              <div className="w-full">
                <h3 className="text-sm font-medium limit2LineText">
                  {data?.title}
                </h3>
                <p className="text-xs font-medium mt-[3px] textSecondary cursor-pointer text1Line">
                  {data?.artistsNames}
                </p>
              </div>
              <div className="flex justify-start items-end">
                <span className="xs:text-[40px] text-6xl font-black text-transparent whitespace-nowrap leading-[1] strokeText">
                  {"#" + ranking}
                </span>
                <span className="ml-auto text-sm text-right whitespace-nowrap hidden xs:inline-block textSecondary font-medium">
                  {date}
                </span>
              </div>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default memo(CardReleaseMedia);
