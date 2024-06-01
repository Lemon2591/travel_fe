import axios from "axios";
import Cookies from "universal-cookie";
import { message } from "antd";

const cookies = new Cookies();
const token = cookies.get("auth_t");

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
          cookies.set("auth_t", response?.data?.data, { path: "/" });
          return http(config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    if (res.data.statusCode === 403) {
      // localStorage.clear();
      // cookies.remove("auth_t");
      // window.location.href = "/";
    }
    return res;
  },
  async (error) => Promise.reject(error)
);
