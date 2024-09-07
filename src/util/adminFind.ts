import { AdminUserListType } from "../config/types";

export const findUserName = (userData: AdminUserListType[], id: number) => {
    const reporterName = userData.find((item) => item.id === id);
    return reporterName?.nickname;
};
