import { axiosInstance } from "./axios";

export const commentReport = (comment_id: number, text: string) => {
    return axiosInstance.post(`/report/comment/${comment_id}/`, { report_detail: text });
};

export const articleReport = (article_id: number, text: string) => {
    return axiosInstance.post(`/report/article/${article_id}/`, { report_detail: text });
};
