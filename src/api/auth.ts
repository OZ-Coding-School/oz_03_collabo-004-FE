import { UserLoginData, UserRegisterData } from "../config/types";
import { axiosInstance } from "./axios";

export const userGoogleAccessTokenReceiver = (token: string) => {
    const requestData = {
        access_token: token,
    };
    return axiosInstance.post("/auth/google/receiver/", requestData);
};

export const userTokenVerify = () => {
    return axiosInstance.post("/auth/token/verify/", {});
};
export const userTokenRefresh = () => {
    return axiosInstance.post("/auth/token/refresh/", {});
};

export const userRoleStatus = () => {
    return axiosInstance.get(`/auth/status/`);
};

export const userRegister = (registerData: UserRegisterData) => {
    return axiosInstance.post("/auth/register/", registerData);
};

export const userLogin = (loginData: UserLoginData) => {
    return axiosInstance.post("/auth/login/", loginData);
};

export const userLogout = () => {
    return axiosInstance.post("/auth/logout/");
};

export const userLoginStatus = () => {
    return axiosInstance.get("/auth/login/status/");
};
