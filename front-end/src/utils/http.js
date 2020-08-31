import axios from "axios";
const API_BASE_URL = "http://localhost:8641";

const http = axios.create({
  baseURL: API_BASE_URL,
});

http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    alert(error && error.response.data.error && error.response.data.error);
    return Promise.reject(error);
  }
);

export default http;
