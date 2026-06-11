import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.post(baseUrl, newBlog, config);
  return response.then((res) => res.data);
};

const update = (blog) => {
  const response = axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.then((res) => res.data);
};

const remove = (blogId) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.delete(`${baseUrl}/${blogId}`, config);
  return response.then((res) => res.data);
};

export default { setToken, getAll, create, update, remove };
