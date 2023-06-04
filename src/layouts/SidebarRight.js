import React from "react";
import SiderbarNewList from "./sibarRightPart/SidebarNewList";
import EmptyPlayList from "./sibarRightPart/EmptyPlayList";
import SidebarHeader from "./sibarRightPart/SidebarHeader";
import { useSelector } from "react-redux";
import { CardMedia } from "../components";
import { v4 } from "uuid";

const SidebarRight = () => {
  const { listSongs, relatedsongs } = useSelector((state) => state.music);
  // console.log(relatedsongs);
  let dataRender =
    listSongs.length > 0
      ? listSongs
      : relatedsongs.length > 0
      ? relatedsongs
      : [];
  if (listSongs.length > 0 && relatedsongs.length > 0) {
    dataRender = dataRender.concat(listSongs, "text", relatedsongs);
  }

  return (
    <div className="relative h-full overflow-hidden">
      <SidebarHeader className="sticky top-0 left-0 right-0 z-10"></SidebarHeader>
      <div className="overflow-y-scroll hiddenScroll pb-[var(--height-playControll)] w-full h-full">
        {listSongs?.length <= 0 && relatedsongs?.length <= 0 ? (
          <div>
            <div>
              <EmptyPlayList></EmptyPlayList>
            </div>
            <div className="absolute -translate-y-1/2 top-1/2">
              <SiderbarNewList></SiderbarNewList>
            </div>
          </div>
        ) : (
          <></>
        )}
        {dataRender.length > 0
          ? dataRender.map((item) =>
              item === "text" ? (
                <div className="text-sm font-semibold textSecondary w-full py-1 px-2">
                  Đề xuất cho bạn
                </div>
              ) : (
                <div key={v4()} className="flex flex-col textPrimary">
                  <CardMedia
                    title={item.title}
                    artists={item?.artistsNames || item?.artists_names}
                    id={item?.encodeId || item?.id}
                    type="small"
                    image={item.thumbnail}
                  ></CardMedia>
                </div>
              )
            )
          : null}
        {/* {listSongs?.length > 0
          ? listSongs.map((item) => (
              <div key={item.encodeId} className="flex flex-col textPrimary">
                <CardMedia
                  title={item.title}
                  artists={item.artistsNames}
                  id={item.encodeId}
                  type="small"
                  image={item.thumbnail}
                ></CardMedia>
              </div>
            ))
          : null}
        {relatedsongs?.length > 0 ? (
          <div className="text-sm font-semibold textSecondary w-full py-1 px-2">
            Đề xuất cho bạn
          </div>
        ) : null}
        {relatedsongs?.length > 0
          ? relatedsongs.map((item) => (
              <div key={v4()} className="flex flex-col textPrimary">
                <CardMedia
                  title={item.title}
                  artists={item.artists_names}
                  id={item.id}
                  type="small"
                  image={item.thumbnail}
                ></CardMedia>
              </div>
            ))
          : null} */}
      </div>
    </div>
  );
};

export default SidebarRight;
