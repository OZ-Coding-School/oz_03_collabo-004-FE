import { axiosInstance } from "./axios";

export const userInfo = () => {
    return axiosInstance.get("/account/profile/", { withCredentials: true });
};

export const userInfoUpdate = () => {
    return axiosInstance.put("/account/profile/update/", { withCredentials: true });
};
