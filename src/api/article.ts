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

export const articleCreate = (title: string, content: string, tags: number, image: string[] | null) => {
    const requestForm = {
        title: title,
        content: content,
        tag_id: tags,
        temp_image_ids: image,
    };
    return axiosInstance.post(`/article/create/`, requestForm);
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
    const requestForm = {
        images: image,
    };
    return axiosInstance.post(`/article/images/`, requestForm, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
export const articleDeleteImage = (image_id: string) => {
    return axiosInstance.delete(`/article/images/${image_id}/`);
};

export const articleRePost = (
    title: string,
    content: string,
    tags: number,
    image: string[] | null,
    article_id: number
) => {
    const requestForm = {
        title: title,
        content: content,
        tag_id: tags,
        temp_image_ids: image,
    };
    return axiosInstance.patch(`/article/update/${article_id}/`, requestForm);
};

export const likeList = () => {
    return axiosInstance.get(`/article/list/like/`);
};
