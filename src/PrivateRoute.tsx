import React, { useState } from "react";

interface DefaultProps {
    [key: string]: unknown;
}

interface PrivateRouteProps {
    element: React.ComponentType<DefaultProps>;
    [key: string]: unknown;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, ...rest }) => {
    const [isVerified, _setIsVerified] = useState<boolean>(true);

    if (!isVerified) {
        return <div>Loading...</div>;
    } else {
        return <Component {...rest} />;
    }
};

export default PrivateRoute;
