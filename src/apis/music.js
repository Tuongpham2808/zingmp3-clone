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
export const apiGetDetaiPlaylist = (pId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/detailplaylist",
        params: {
          id: pId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetRelatedSong = (sId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/RelatedSong",
        params: {
          id: sId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
