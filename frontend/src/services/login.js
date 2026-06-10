import axios from "axios";
const baseUrl = "/api/login";

const login = (username, password) => {
  const response = axios.post(`${baseUrl}`, { username, password });
  return response.then((res) => res.data);
};

export default {
  login,
};
