import { axiosInstance } from "./axios";


export const contentList = () => {
    return axiosInstance.get("/article/", { withCredentials: true });
};

export const ContentAddView = () => {
    return axiosInstance.get("/article/{article_id}/view/", { withCredentials: true });
}

export const ContentAddLike = () => {
    return axiosInstance.get("/article/{article_id}/like/", { withCredentials: true });
};

export const ContentDetail = () => {
    return axiosInstance.get("/article/{article_id}",{withCredentials: true});
}