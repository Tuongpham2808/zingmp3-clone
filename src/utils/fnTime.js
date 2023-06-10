export function formatTime(number) {
  let time;
  let hour = (new Date().getTime() - Number(number) * 1000) / 3600000;

  if (hour < 1) {
    time = Math.floor(hour * 60) + " phút trước";
  }
  if (1 <= hour && hour <= 12) {
    time = Math.floor(hour) + " giờ trước";
  }
  if (12 < hour && hour < 24) {
    if (hour - new Date().getHours() < 0) {
      time = Math.floor(hour) + " giờ trước";
    } else {
      time = "hôm qua";
    }
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

export function formatDate(number, separate = ".") {
  let date = new Date(number * 1000)?.toLocaleDateString("zh-HK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  let dateString = separate !== "/" ? date?.split("/").join(separate) : date;
  return dateString;
}

export function formatTimeProgress(min, sec) {
  let result = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
  return result;
}
export function formatDuration(number) {
  let min = Math.floor(number / 60);
  let sec = number % 60;
  let result = `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`;
  return result;
}
