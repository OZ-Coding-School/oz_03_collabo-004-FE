import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DefaultProps {
    [key: string]: unknown;
}

interface PrivateRouteProps {
    element: React.ComponentType<DefaultProps>;
    [key: string]: unknown;
}

const AdminRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
        if (!isAdmin) {
            return nav("/", { replace: true });
        }
    }, [isAdmin, nav]);

    return (
        isAdmin && (
            <div>
                <Component {...rest} />
            </div>
        )
    );
};

export default AdminRoute;
