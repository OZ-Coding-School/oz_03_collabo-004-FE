import { useEffect, useState } from "react";
import useVerify from "../hooks/useVerify";
import { Navigate } from "react-router-dom";
import { authApi } from "../api";

interface DefaultProps {
    [key: string]: unknown;
}

interface PrivateRouteProps {
    element: React.ComponentType<DefaultProps>;
    [key: string]: unknown;
}

const PublicRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    const [isLogin, setIsLogin] = useState(false);
    const { refreshToken, verifyToken } = useVerify();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await authApi.userRoleStatus();
                setIsLogin(true);
            } catch {
                setIsLogin(false);
            } finally {
                setIsLoading(false);
            }
        };
        verifyUser();
    }, [refreshToken, verifyToken]);

    if (isLoading) {
        return <div></div>;
    }

    return !isLogin ? <Component {...rest} /> : <Navigate to={"/"} />;
};

export default PublicRoute;
