import axios from "../utils/axios";

export const getHomeAPI = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/home",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
