import axios from "../utils/axios";

export const apiSuggestSearch = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/suggestSearch",
        params: {
          query: query,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiSearch = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "/search",
        params: {
          keyword: query,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
