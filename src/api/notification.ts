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
