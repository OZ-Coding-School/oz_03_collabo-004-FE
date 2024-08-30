import { axiosInstance } from "./axios";

export const reportStatusAll = () => {
    return axiosInstance.get("/admin/report/status/");
};

export const reportStatusPick = (uuid: string) => {
    return axiosInstance.get(`/admin/user/${uuid}/reports/`);
};

export const articleReportUpdate = (article_uuid: string) => {
    return axiosInstance.patch(`/admin/report/article/${article_uuid}/`);
};

export const commentReportUpdate = (comment_uuid: string) => {
    return axiosInstance.patch(`/admin/report/comment/${comment_uuid}/`);
};

export const userListAll = () => {
    return axiosInstance.get("/admin/users/");
};

export const userListPick = (uuid: string) => {
    return axiosInstance.get(`/admin/user/${uuid}/`);
};
export const userAccountUpdate = (uuid: string) => {
    console.log(uuid);
    //TODO 작성필요
};
export const userAccountDelete = (uuid: number) => {
    return axiosInstance.delete(`/admin/user/${uuid}/`);
};

export const userRoleUpdate = (uuid: number, bool: string) => {
    const requestForm = {
        is_superuser: bool,
    };
    return axiosInstance.put(`/admin/state/${uuid}/`, requestForm);
};

export const adminArticleView = (article_uuid: string) => {
    return axiosInstance.get(`/admin/article/${article_uuid}`);
};
export const adminArticleDelete = (article_uuid: string) => {
    return axiosInstance.delete(`/admin/article/${article_uuid}`);
};

export const adminCommentView = (comment_uuid: string) => {
    return axiosInstance.get(`/admin/comment/${comment_uuid}`);
};
export const adminCommentDelete = (comment_uuid: string) => {
    return axiosInstance.delete(`/admin/comment/${comment_uuid}`);
};
