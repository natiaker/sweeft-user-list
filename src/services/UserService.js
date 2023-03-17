import axios from "axios";

const baseUrl = "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com";

export default {
  getList: async function (page, endpoint) {
    try {
      console.log(endpoint);
      let url;
      if ((page != null) & (page > 0)) {
        url = `${baseUrl}${endpoint}`;
        console.log(url);
      } else {
        url = `${baseUrl}`;
      }
      const response = await axios.get(url);
      return response.data.list;
    } catch (error) {
      throw error;
    }
  },
};
