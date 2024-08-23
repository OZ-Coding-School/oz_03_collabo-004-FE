import { useGoogleLogin } from "@react-oauth/google";
import { authApi } from "../api";
import ButtonLogin from "../common/button/ButtonLogin";

const HomePage = () => {
    const googleLoginRequest = async (token: string) => {
        console.log(token);
        try {
            const result = await authApi.userGoogleAccessTokenReceiver(token);
            console.log(result);
        } catch (error) {
            console.error(error);
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
