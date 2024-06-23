import axios from "axios";
import { message } from "antd";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  async (res) => {
    const { config } = res;

    if (res.data.statusCode === 404) {
      try {
        const response = await http.get("/api/refresh-token");
        if (response.data.statusCode === 200) {
          localStorage.setItem("auth_t", response?.data?.data);
          return http(config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    if (res.data.statusCode === 403) {
      localStorage.clear();
      localStorage.clear();
      window.location.href = "/";
    }
    return res;
  },
  async (error) => Promise.reject(error)
);
