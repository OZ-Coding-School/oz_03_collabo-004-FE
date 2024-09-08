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

export const userIdCheck = (id: string) => {
    return axiosInstance.get(`/auth/check-username/?username=${id}`);
};
export const userNameCheck = (name: string) => {
    return axiosInstance.get(`/auth/check-nickname/?nickname=${name}`);
};
export const userEmailCheck = (email: string) => {
    return axiosInstance.get(`/auth/check-email/?email=${email}`);
};

export const passwordResetEmail = (id: string) => {
    const requestForm = {
        username: id,
    };
    return axiosInstance.post(`/auth/email/password/`, requestForm);
};

export const passwordResetConfirm = (uidb64: string, token: string, password: string) => {
    const requestForm = {
        uidb64: uidb64,
        token: token,
        new_password: password,
    };
    return axiosInstance.post(`/auth/password/reset/`, requestForm);
};
