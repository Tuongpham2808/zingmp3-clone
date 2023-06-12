import React from "react";
import HeadSection from "../components/HeadSection";
import LayoutSection from "../components/LayoutSection";
import { useSelector } from "react-redux";
import SectionTop from "./SearchAllPart/SectionTop";
import SectionSongs from "./SearchAllPart/SectionSongs";
import SectionListAlbums from "./homePart/SectionListAlbums";
import SectionMV from "./SearchAllPart/SectionMV";
import { useSearchParams } from "react-router-dom";
import SectionArtist from "./SearchAllPart/SectionArtist";

const SearchAllPage = () => {
  const { dataSearch } = useSelector((state) => state.search);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  console.log(dataSearch);

  return (
    <div className="w-full">
      <LayoutSection className="md:mt-7">
        <HeadSection title="Nổi bật"></HeadSection>
        <SectionTop></SectionTop>
      </LayoutSection>
      <LayoutSection className="md:mt-7">
        <HeadSection
          title="Bài hát"
          all
          link={"/tim-kiem/bai-hat?q=" + URLSearchParams.get("q")}
        ></HeadSection>
        <SectionSongs></SectionSongs>
      </LayoutSection>
      <LayoutSection className="md:mt-7">
        <HeadSection
          title="Playlist/album"
          all
          link={"/tim-kiem/playlist?q=" + URLSearchParams.get("q")}
        ></HeadSection>
        <SectionListAlbums
          data={dataSearch?.playlists}
          styles="more"
        ></SectionListAlbums>
      </LayoutSection>
      <LayoutSection className="md:mt-7">
        <HeadSection
          title="MV"
          all
          link={"/tim-kiem/video?q=" + URLSearchParams.get("q")}
        ></HeadSection>
        <SectionMV></SectionMV>
      </LayoutSection>
      <LayoutSection className="md:mt-7">
        <HeadSection
          title="Nghệ Sĩ/OA"
          all
          link={"/tim-kiem/artist?q=" + URLSearchParams.get("q")}
        ></HeadSection>
        <SectionArtist></SectionArtist>
      </LayoutSection>
    </div>
  );
};

export default SearchAllPage;
