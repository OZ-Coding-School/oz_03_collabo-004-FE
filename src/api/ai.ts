import { axiosInstance } from "./axios";

export const aiHunsuDetail = (article_id: number | undefined) => {
    return axiosInstance.get(`/ai_hunsu/${article_id}/`);
};
