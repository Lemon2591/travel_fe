import { message } from "antd";
import { http } from "../../config/http.config";

export const getUserDetails = async () => {
  try {
    const res = await http.get("/api/get-user");
    return res?.data?.data;
  } catch (error) {
    return error;
  }
};

export const getStatisticView = async (startTime, endTime, website, type) => {
  try {
    const res = await http.post("/api/get-view", {
      startTime,
      endTime,
      website,
      type,
    });
    return res?.data?.data;
  } catch (error) {
    message.error("Đã xảy ra lỗi !");
    return error;
  }
};
