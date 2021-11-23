import React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { Route, Navigate } from 'react-router-dom';
import routePath from 'src/constants/routePath';

interface Props {
    Component: typeof React.Component;
    auth: boolean;
    roleAllow: number[];
}

const PrivateRoute: React.FC<any> = ({ Component: Component, auth = !!Cookies.get('access_token'), roleAllow, ...rest }) => {
    let role = 0;
    const access_token = Cookies.get('access_token') || 'xxx';
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenDecoded: any = jwt_decode(access_token);
        role = tokenDecoded?.role;
    } catch (error) { }

    return (
        <>
            {auth && roleAllow.includes(Number(role)) ?
                <Component />
                : (!auth ? <Navigate to={routePath.SIGN_IN} />
                    : <Navigate to={'/'} />)
            }
        </>
    );
};

export default PrivateRoute;