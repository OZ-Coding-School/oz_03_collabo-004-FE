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

const AdminRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    const { refreshToken, verifyToken, isLogin } = useVerify();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            await refreshToken();
            await verifyToken();
            const response = await authApi.userRoleStatus();
            if (response.data.status) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
            setIsLoading(false);
        };
        verifyUser();
    }, [refreshToken, verifyToken]);

    if (isLoading) {
        return <div></div>;
    }

    return isLogin && isAdmin ? <Component {...rest} /> : <Navigate to={"/"} />;
};

export default AdminRoute;
