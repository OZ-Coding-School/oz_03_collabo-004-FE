import { axiosInstance } from "./axios";

export const articleDetail = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/`);
};
