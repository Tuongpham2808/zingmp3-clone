import React from "react";
import ImageMedia from "./ImageMedia";
import { Link } from "react-router-dom";

const ItemAlbum = ({ data, styles = "basic" }) => {
  return (
    <div key={data.encodeId} className="flex flex-col gap-y-3">
      <ImageMedia
        image={data?.thumbnailM}
        title={data?.title}
        link={data?.link}
      ></ImageMedia>
      {styles === "basic" && (
        <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
          {data?.sortDescription}
        </span>
      )}
      {styles === "more" && (
        <div className="w-full flex flex-col gap-y-1">
          <Link to={data?.link}>
            <h3 className="text-sm font-bold textPrimary text1Line">
              {data?.title}
            </h3>
          </Link>
          <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
            {data?.artists?.map((artist) => artist?.name).join(", ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default ItemAlbum;
