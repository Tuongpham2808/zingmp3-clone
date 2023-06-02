import axios from "../utils/axios";

export const apiGetSong = (sId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/song",
        params: {
          id: sId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetSongDetail = (sId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/infosong",
        params: {
          id: sId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
