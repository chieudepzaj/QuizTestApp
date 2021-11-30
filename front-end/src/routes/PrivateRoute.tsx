import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import routePath from 'src/constants/routePath';
import { useAppSelector } from 'src/store/hooks';

const PrivateRoute: React.FC<any> = ({
  Component,
  // roleAllow,
}) => {
  return (
    <>
      {Cookies.get('accessToken') ? (
        // && roleAllow.includes(Number(role))
        <Component />
      ) : (
        <Navigate to={routePath.SIGN_IN} />
      )}
    </>
  );
};

export default PrivateRoute;
