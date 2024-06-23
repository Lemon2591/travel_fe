import { http } from "../config/http.config";
import { message } from "antd";
import { checkResponse } from "../helper/helper";
import axios from "axios";

export const createPost = async (data) => {
  try {
    const res = await http.post("/api/create-post", data);
    const obj = checkResponse(res);
    return obj;
  } catch (error) {
    return message.error("Đăng bài viết thất bại !");
  }
};

export const updatePost = async (data) => {
  try {
    const res = await http.put("/api/update-post", data);
    const obj = checkResponse(res);
    return obj;
  } catch (error) {
    return false;
  }
};

export const changStatusPost = async ({ id, type }) => {
  try {
    const res = await http.put(`/api/change-status-cms/${id}?type=${type}`);
    const obj = checkResponse(res);
    return obj;
  } catch (error) {
    return message.error("Thay đổi thất bại !");
  }
};

export const uploadFile = async (url, form) => {
  try {
    const res = await axios.post(url, form, {
      withCredentials: true,
    });
    const obj = checkResponse(res);
    return obj;
  } catch (error) {
    return false;
  }
};
