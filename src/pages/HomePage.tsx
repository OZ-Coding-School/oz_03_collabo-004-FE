import { useGoogleLogin } from "@react-oauth/google";
import { accountApi, authApi } from "../api";
import ButtonLogin from "../common/button/ButtonLogin";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../config/store";
import { UserData } from "../config/types";
import { useEffect } from "react";

const HomePage = () => {
    const { initUser, user } = useUserStore();

    const { data: userInfo, refetch: refetchUserInfo } = useQuery({
        queryKey: ["userInfo"],
        queryFn: accountApi.userInfo,
        enabled: false,
    });

    //? TEST CODE
    useEffect(() => {
        if (userInfo) {
            initUser(userInfo!.data as UserData);
        }
        console.log(user);
    }, [user, userInfo, initUser]);

    const googleLoginRequest = async (token: string) => {
        try {
            await authApi.userGoogleAccessTokenReceiver(token);
            await refetchUserInfo();
        } catch (error) {
            console.error("login failed", error);
        }
    };

    const googleLoginHandler = useGoogleLogin({
        onSuccess: (res) => {
            googleLoginRequest(res.access_token);
        },

        onError: () => {
            console.error("Unexpected Login Request Error");
        },
    });

    return <ButtonLogin onClick={googleLoginHandler} type="social" />;
};

export default HomePage;
