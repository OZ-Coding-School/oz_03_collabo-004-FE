import { axiosInstance } from "./axios";

export const commentCreate = (article_id: number | undefined, formData: FormData) => {
    return axiosInstance.post(`/comment/create/articles/${article_id}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const commentSelect = (comment_id: number) => {
    return axiosInstance.patch(`/comment/${comment_id}/select/`, { withCredentials: true });
};

//훈수 도움돼요 안돼요
export const commentFeedback = (comment_id: number, type: string) => {
    return axiosInstance.post(`/comment/${comment_id}/react/`, { reaction_type: type }, { withCredentials: true });
};

export const commentTopList = () => {
    return axiosInstance.get("/comment/top/");
};
