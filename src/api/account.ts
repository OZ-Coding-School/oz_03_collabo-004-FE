import { axiosInstance } from "./axios";

export const userInfo = () => {
    return axiosInstance.get("/account/profile/", { withCredentials: true });
};
