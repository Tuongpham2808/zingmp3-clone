import React from "react";
import LayoutSection from "../components/LayoutSection";
import HeadSection from "../components/HeadSection";
import { useSelector } from "react-redux";
import CardArtist from "../components/CardArtist";

const SearchArtistPage = () => {
  const { dataSearch } = useSelector((state) => state.search);
  return (
    <div className="w-full">
      <LayoutSection className="md:mt-7">
        <HeadSection title="Nghệ Sĩ/OA"></HeadSection>
        <div className="w-full grid grid-cols-5 gap-7">
          {dataSearch?.artists?.length > 0 &&
            dataSearch?.artists?.map((item) => (
              <CardArtist data={item}></CardArtist>
            ))}
        </div>
      </LayoutSection>
    </div>
  );
};

export default SearchArtistPage;
