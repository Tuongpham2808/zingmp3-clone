import React from "react";
import LayoutSection from "../components/LayoutSection";
import HeadSection from "../components/HeadSection";
import { useSelector } from "react-redux";
import ItemAlbum from "../components/ItemAlbum";

const SearchPlaylistPage = () => {
  const { dataSearch } = useSelector((state) => state.search);
  return (
    <div className="w-full">
      <LayoutSection className="md:mt-7">
        <HeadSection title="Bài hát"></HeadSection>
        <div className="w-full grid grid-cols-5 gap-7">
          {dataSearch?.playlists?.length > 0 &&
            dataSearch?.playlists?.map((item) => (
              <ItemAlbum data={item} styles="more"></ItemAlbum>
            ))}
        </div>
      </LayoutSection>
    </div>
  );
};

export default SearchPlaylistPage;
