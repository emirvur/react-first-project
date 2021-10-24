import axios from "axios";

export default () => {
 // const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://localhost:44338/api",
    headers: {
      "ApiKey": "123",
    },
  });
};