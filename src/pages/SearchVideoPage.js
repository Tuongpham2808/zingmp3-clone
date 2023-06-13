import React from "react";
import LayoutSection from "../components/LayoutSection";
import HeadSection from "../components/HeadSection";
import { useSelector } from "react-redux";
import CardVideo from "../components/CardVideo";

const SearchVideoPage = () => {
  const { dataSearch } = useSelector((state) => state.search);
  return (
    <div className="w-full">
      <LayoutSection className="md:mt-7">
        <HeadSection title="Nghệ Sĩ/OA"></HeadSection>
        <div className="w-full grid grid-cols-3 gap-7">
          {dataSearch?.videos?.length > 0 &&
            dataSearch?.videos?.map((item) => (
              <CardVideo data={item}></CardVideo>
            ))}
        </div>
      </LayoutSection>
    </div>
  );
};

export default SearchVideoPage;
