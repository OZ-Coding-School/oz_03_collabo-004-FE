import { axiosInstance } from "./axios";

export const userGoogleAccessTokenReceiver = (token: string) => {
    const requestData = {
        google_access_token: token,
    };
    return axiosInstance.post("/auth/google/receiver", requestData);
};
