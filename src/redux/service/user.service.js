import { http } from "../../config/http.config";

export const getUserDetails = async () => {
  try {
    const res = await http.get("/api/get-user");
    return res?.data?.data;
  } catch (error) {
    return error;
  }
};
