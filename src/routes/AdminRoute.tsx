interface DefaultProps {
    [key: string]: unknown;
}

interface PrivateRouteProps {
    element: React.ComponentType<DefaultProps>;
    [key: string]: unknown;
}

const AdminRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    return <Component {...rest} />;
};

export default AdminRoute;
