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
        <HeadSection title="Playlist/Album"></HeadSection>
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-7 gap-x-3 md:gap-x-4 lg:gap-x-7 grid-cols-2">
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
