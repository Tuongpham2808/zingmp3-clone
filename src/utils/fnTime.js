export function formatTime(number) {
  let time;
  let hour = (new Date().getTime() - Number(number) * 1000) / 3600000;
  if (hour < 24) {
    time = Math.floor(hour) + " giờ trước";
  }
  if (hour >= 24) {
    time = Math.floor(hour / 24) + " ngày trước";
  }
  if (hour / 24 >= 30) {
    time = Math.floor(hour / (24 * 30)) + " tháng trước";
  }
  if (hour / (24 * 30) >= 12) {
    time = Math.floor(hour / (24 * 30 * 12)) + " năm trước";
  }
  return time;
}
