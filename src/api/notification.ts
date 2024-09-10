import { axiosInstance } from "./axios";

export const notificationList = () => {
    return axiosInstance.get("/notification/");
};

export const notificationDelete = (notification_id: number) => {
    return axiosInstance.delete(`/notification/${notification_id}/delete/`);
};

export const notificationRead = (notification_id: number) => {
    return axiosInstance.put(`/notification/${notification_id}/read/`);
};

export const adminNotificationList = () => {
    return axiosInstance.get(`/notification/admin/`);
};

export const adminNotificationDelete = (notification_id: number) => {
    return axiosInstance.delete(`/notification/${notification_id}/delete/admin/`);
};

export const adminNotificationRead = (notification_id: number) => {
    return axiosInstance.put(`/notification/${notification_id}/read/admin/`);
};
