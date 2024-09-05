import { axiosInstance } from "./axios";

export const commentReport = (comment_id: number, text: string) => {
    return axiosInstance.post(`/report/comment/${comment_id}/`, { report_detail: text }, { withCredentials: true });
};
