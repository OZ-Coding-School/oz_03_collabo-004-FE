import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";

interface DefaultProps {
    [key: string]: unknown;
}

interface PrivateRouteProps {
    element: React.ComponentType<DefaultProps>;
    [key: string]: unknown;
}

const verifyUser = async () => {
    const response = await authApi.userTokenVerify();

    if (response.status === 200) {
        return true;
    }
    throw new Error("Token verification failed");
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    const nav = useNavigate();

    const {
        isLoading,
        data: isLogin,
        error,
        refetch,
    } = useQuery({
        queryKey: ["verifyUser"],
        queryFn: verifyUser,
        retry: false,
    });

    useEffect(() => {
        const handleError = async () => {
            if (error) {
                console.warn("Access Token Expired, Retrying...");
                try {
                    await authApi.userTokenRefresh();
                    refetch();
                } catch (refreshError) {
                    console.error("Unexpected Token", refreshError);
                    nav("/", { replace: true });
                }
            }
        };
        handleError();
    }, [error, nav, refetch]);

    useEffect(() => {
        if (!isLoading && !isLogin) {
            return nav("/", { replace: true });
        }
    }, [isLoading, isLogin, nav]);

    if (isLoading) {
        return <div></div>;
    }

    return (
        isLogin && (
            <div>
                <Component {...rest} />
            </div>
        )
    );
};

export default PrivateRoute;
