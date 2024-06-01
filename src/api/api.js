import { http } from "../config/http.config";
import { message } from "antd";
import { checkResponse } from "../helper/helper";

export const createPost = async (data) => {
  try {
    const res = await http.post("/api/create-post", data);
    const obj = checkResponse(res);
    return obj;
  } catch (error) {
    return message.error("Đăng bài viết thất bại !");
  }
};
