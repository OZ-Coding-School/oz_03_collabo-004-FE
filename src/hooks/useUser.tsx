import { useCallback } from "react";
import { useUserStore } from "../config/store";
import { accountApi } from "../api";
import { UserData } from "../config/types";

const useUser = () => {
    const { initUser } = useUserStore();
    const getUserInfo = useCallback(async () => {
        const response = await accountApi.userInfo();
        initUser(response!.data as UserData);
    }, [initUser]);
    return { getUserInfo };
};

export default useUser;
