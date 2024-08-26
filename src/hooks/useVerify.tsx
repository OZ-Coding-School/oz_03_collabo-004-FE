import { useCallback, useState } from "react";
import { authApi } from "../api";

const useVerify = () => {
    const [isLogin, setIsLogin] = useState(false);

    const refreshToken = useCallback(async () => {
        try {
            await authApi.userTokenRefresh();
        } catch (error) {
            console.error("token is not Invalid", error);
            setIsLogin(false);
        }
    }, []);

    const verifyToken = useCallback(async () => {
        try {
            await authApi.userTokenVerify();
            setIsLogin(true);
        } catch (error) {
            console.error("token is not Verified", error);
            setIsLogin(false);
        }
    }, []);

    return { refreshToken, verifyToken, isLogin };
};

export default useVerify;
