import { axiosInstance } from "./axios";

export const reportStatusAll = () => {
    return axiosInstance.get("/admin/report/status/");
};

export const reportStatusPick = (uuid: string) => {
    return axiosInstance.get(`/admin/user/${uuid}/reports/`);
};

export const articleReportUpdate = (article_uuid: number, status: "RS" | "RJ") => {
    const requestForm = {
        status: status,
    };

    return axiosInstance.patch(`/admin/report/article/${article_uuid}/`, requestForm);
};

export const commentReportUpdate = (comment_uuid: number, status: "RS" | "RJ") => {
    const requestForm = {
        status: status,
    };

    return axiosInstance.patch(`/admin/report/comment/${comment_uuid}/`, requestForm);
};

export const userListAll = () => {
    return axiosInstance.get("/admin/users/");
};

export const userListPick = (uuid: string) => {
    return axiosInstance.get(`/admin/user/${uuid}/`);
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
export const adminArticleDelete = (article_uuid: string) => {
    return axiosInstance.delete(`/admin/article/${article_uuid}/`);
};
