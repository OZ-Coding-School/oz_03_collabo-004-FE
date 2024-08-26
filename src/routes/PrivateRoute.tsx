import { useEffect, useState } from "react";
import useVerify from "../hooks/useVerify";
import { Navigate } from "react-router-dom";

interface DefaultProps {
    [key: string]: unknown;
}

interface PrivateRouteProps {
    element: React.ComponentType<DefaultProps>;
    [key: string]: unknown;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    const { refreshToken, verifyToken, isLogin } = useVerify();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await refreshToken();
                await verifyToken();
            } catch (error) {
                console.error("verifyUser Failed", error);
            } finally {
                setIsLoading(true);
            }
        };
        verifyUser();
    }, [refreshToken, verifyToken]);

    if (isLoading) {
        return <div></div>;
    }

    return isLogin ? <Component {...rest} /> : <Navigate to={"/"} />;
};

export default PrivateRoute;