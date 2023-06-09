import axios from "../utils/axios";

export const getNewReleaseChart = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/charthome",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
