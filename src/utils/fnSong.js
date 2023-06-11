import { current } from "@reduxjs/toolkit";

let listSongId = [
  "ZW8IC98I",
  "ZW8WCUW0",
  "ZW7U90B6",
  "ZWA80CI6",
  "ZW8W6UEF",
  "ZW79C8FO",
  "ZW79FF97",
  "ZW78679U",
  "ZWZC8WBZ",
  "ZW78D0FZ",
];
export function PromoteSongRandomId() {
  let number = Math.floor(Math.random() * listSongId.length);
  return listSongId[number];
}

export function johnNameArtist(arr) {
  let result = arr?.map((item) => item?.name).join(", ");

  return result;
}

export function editLinkAlbum(link, id, radioPid = "", type) {
  let result;
  result = link?.replace("https://zingmp3.vn/", "");
  if (type === 1 && radioPid !== "") {
    result = result.replace(id, radioPid);
  }
  return result;
}
