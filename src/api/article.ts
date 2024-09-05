import { axiosInstance } from "./axios";

export const articleDetail = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/`, { withCredentials: true });
};

export const articleList = () => {
    return axiosInstance.get("/article/", { withCredentials: true });
};

export const articleAddView = (article_id: number) => {
    return axiosInstance.get(`/article/${article_id}/view/`, { withCredentials: true });
};

export const articleAddLike = (article_id: number) => {
    return axiosInstance.post(`/article/${article_id}/like/`, { withCredentials: true });
};

export const articleCreate = (title: string, content: string, tags: number) => {
    const requestForm = {
        title: title,
        content: content,
        tag_id: tags,
    };
    return axiosInstance.post(`/article/create/`, requestForm, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const articleView = (article_id: number) => {
    return axiosInstance.get(`article/${article_id}/view/`);
};

export const articleDelete = (article_id: number) => {
    return axiosInstance.delete(`article/delete/${article_id}/`);
};

export const articleSearch = (text: string) => {
    return axiosInstance.get(`article/search/?q=${text}`);
};

export const articleTopList = () => {
    return axiosInstance.get("/article/top/");
};

export const articleUploadImage = (image: File) => {
    return axiosInstance.post(`/article/images/`, image);
};
