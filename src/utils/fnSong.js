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
