import { axiosInstance } from "./axios";

export const articleDetail = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/`, { withCredentials: true });
};

export const ArticleList = () => {
    return axiosInstance.get("/article/", { withCredentials: true });
};

export const ArticleAddView = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/view/`, { withCredentials: true });
};

export const ArticleAddLike = (article_id: number) => {
    return axiosInstance.post(`/article/${article_id}/like/`, {}, { withCredentials: true });
};
