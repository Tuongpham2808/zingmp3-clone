import React from "react";
import { useSelector } from "react-redux";
import CardArtist from "../../components/CardArtist";
import { v4 } from "uuid";

const SectionArtist = () => {
  const { dataSearch } = useSelector((state) => state.search);
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-7">
      {dataSearch?.artists?.length > 0 &&
        dataSearch?.artists
          ?.filter((i, index) => index < 5)
          ?.map((item) => <CardArtist key={v4()} data={item}></CardArtist>)}
    </div>
  );
};

export default SectionArtist;
