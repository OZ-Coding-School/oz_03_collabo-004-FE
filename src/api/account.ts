import { axiosInstance } from "./axios";
import { UserUpdateData } from "../config/types";

export const userInfo = () => {
    return axiosInstance.get("/account/profile/", { withCredentials: true });
};

export const userInfoUpdate = (updateData: UserUpdateData) => {
    return axiosInstance.put("/account/profile/update/", updateData, { withCredentials: true });
};

export const userInfoImageUpdate = (image: File) => {
    const formData = new FormData();
    formData.append("profile_image", image);
    return axiosInstance.put("/account/profile/image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

//다른 유저의 마이페이지 볼 수 있는
export const userInfoPublic = (userId: number) => {
    return axiosInstance.get(`/account/profile/${userId}/`);
};

export const userInfoImageDelete = () => {
    return axiosInstance.delete("/account/profile/image/delete/");
};

export const userLevelUpdate = (userId: number, level: number) => {
    const requestForm = {
        hunsoo_level: level,
    };
    return axiosInstance.put(`/account/level/${userId}/`, requestForm);
};
