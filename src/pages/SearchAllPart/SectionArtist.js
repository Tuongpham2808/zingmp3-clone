import React from "react";
import { useSelector } from "react-redux";
import CardArtist from "../../components/CardArtist";

const SectionArtist = () => {
  const { dataSearch } = useSelector((state) => state.search);
  return (
    <div className="w-full grid grid-cols-5 gap-x-7">
      {dataSearch?.artists?.length > 0 &&
        dataSearch?.artists
          ?.filter((i, index) => index < 5)
          ?.map((item) => <CardArtist data={item}></CardArtist>)}
    </div>
  );
};

export default SectionArtist;
