import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://api.hunsuking.yoyobar.xyz/api",
    headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
    },
    withCredentials: true,
});
