import { axiosInstance } from "./axios";

export const userGoogleAccessTokenReceiver = (token: string) => {
    const requestData = {
        access_token: token,
    };
    return axiosInstance.post("/auth/google/receiver", requestData);
};
