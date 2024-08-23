import { axiosInstance } from "./axios";

export const userGoogleAccessTokenReceiver = (token: string) => {
    const requestData = {
        access_token: token,
    };
    return axiosInstance.post("/auth/google/receiver", requestData);
};

export const userTokenVerify = () => {
    return axiosInstance.post("/auth/token/verify", {
        withCredential: true,
    });
};
export const userTokenRefresh = () => {
    return axiosInstance.post("/auth/token/refresh", {
        withCredential: true,
    });
};
